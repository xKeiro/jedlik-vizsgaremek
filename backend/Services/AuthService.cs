using AutoMapper;
using backend.Dtos.Auth;
using backend.Dtos.Users;
using backend.Interfaces.Services;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using OneOf;

namespace backend.Services;

public class AuthService: IAuthService
{
    private readonly JedlikContext _context;
    private readonly IMapper _mapper;
    private readonly IStatusMessageService _statusMessage;
    private readonly IJwtTokenGeneratorService _jwtTokenGeneratorService;

    public AuthService(JedlikContext context, IMapper mapper, IStatusMessageService statusMessage, IJwtTokenGeneratorService jwtTokenGeneratorService)
    {
        _context = context;
        _mapper = mapper;
        _statusMessage = statusMessage;
        _jwtTokenGeneratorService = jwtTokenGeneratorService;
    }

    public async Task<OneOf<AuthResult, StatusMessage>> Register(UserRegister userRegister)
    {
        if (userRegister.Password != userRegister.PasswordConfirm)
        {
            return _statusMessage.ConfirmationPasswordMismatch();
        }
        var countryWithVat = await _context.CountriesWithVat.FirstOrDefaultAsync(cwv => cwv.Country == userRegister.Address.Country);
        if (countryWithVat is null)
        {
            return _statusMessage.DoesNotExist(nameof(userRegister.Address.Country), userRegister.Address.Country);
        }
        var user = _mapper.Map<UserRegister, User>(userRegister);
        user.Address.CountryWithVat = countryWithVat;
        var (isUnique, notUniquePropertyNames) = await IsUnique(user);
        if (!isUnique)
        {
            return _statusMessage.NotUnique<User>(notUniquePropertyNames);
        }
        user.Password = GetHashedPassword(user.Password);
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return new AuthResult() 
        {
            JwtToken = _jwtTokenGeneratorService.GenerateToken(user),
            UserPublic = _mapper.Map<User, UserPublic>(user)
        };
    }

    private string GetHashedPassword(string password)
    {
        var salt = BCrypt.Net.BCrypt.GenerateSalt(12);
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);
        return hashedPassword;
    }

    private async Task<(bool result, List<string> notUniquePropertyNames)> IsUnique(User user)
    {
        List<string> notUniquePropertyNames = new();
        var isUnique = !await _context.Users.AnyAsync(u => u.Username == user.Username);
        if (!isUnique)
        {
            notUniquePropertyNames.Add(nameof(user.Username));
        }
        isUnique = !await _context.Users.AnyAsync(u => u.Email.ToLower() == user.Email.ToLower());
        if (!isUnique)
        {
            notUniquePropertyNames.Add(nameof(user.Email));
        }
        if (notUniquePropertyNames.Any())
        {
            return (false, notUniquePropertyNames);
        }
        return (true, notUniquePropertyNames);
    }
}