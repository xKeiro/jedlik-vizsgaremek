using AutoMapper;
using backend.Dtos.Auth;
using backend.Dtos.Users;
using backend.Interfaces.Services;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using OneOf;

namespace backend.Services;

public class UserService : IUserService
{
    private readonly JedlikContext _context;
    private readonly IMapper _mapper;
    private readonly IStatusMessageService _statusMessage;
    public UserService(JedlikContext context, IStatusMessageService statusMessage, IMapper mapper)
    {
        _context = context;
        _statusMessage = statusMessage;
        _mapper = mapper;
    }
    public async Task<OneOf<UserPublic, StatusMessage>> FindById(ulong userId)
    {
        var user = await _context.Users.FindAsync(userId);
        return user == null
            ? _statusMessage.NotFound<User>(userId)
            : _mapper.Map<User, UserPublic>(user);
    }
    public async Task<OneOf<UserPublic, StatusMessage>> Update(ulong userId, UserRegister userRegister)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return _statusMessage.NotFound<User>(userId);
        }
        if (userRegister.Password != userRegister.PasswordConfirm)
        {
            return _statusMessage.ConfirmationPasswordMismatch();
        }
        var countryWithVat = await _context.CountriesWithVat.FirstOrDefaultAsync(cwv => cwv.Country == userRegister.Address.Country);
        if (countryWithVat is null)
        {
            return _statusMessage.DoesNotExist(nameof(userRegister.Address.Country), userRegister.Address.Country);
        }
        List<string> propertiesToNotCheck = new();
        if (user.Username == userRegister.Username)
        {
            propertiesToNotCheck.Add(nameof(user.Username));
        }
        if (user.Email == userRegister.Email)
        {
            propertiesToNotCheck.Add(nameof(user.Email));
        }
        var (isUnique, notUniquePropertyNames) = await IsUnique(userRegister, propertiesToNotCheck);
        if (!isUnique)
        {
            return _statusMessage.NotUnique<User>(notUniquePropertyNames);
        }
        _ = _mapper.Map(userRegister, user);
        user.Address.CountryWithVat = countryWithVat;
        user.Password = GetHashedPassword(user.Password);


        _ = _context.Users.Update(user);
        _ = await _context.SaveChangesAsync();
        return _mapper.Map<User, UserPublic>(user);
    }

    public async IAsyncEnumerable<UserPublic> GetAll()
    {
        await foreach (var user in _context.Users.AsAsyncEnumerable())
        {
            yield return _mapper.Map<User, UserPublic>(user);
        }
    }
    private string GetHashedPassword(string password)
    {
        var salt = BCrypt.Net.BCrypt.GenerateSalt(12);
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);
        return hashedPassword;
    }

    private async Task<(bool result, List<string> notUniquePropertyNames)> IsUnique
        (UserRegister userRegister, List<string>? propertiesToNotCheck = null)
    {
        List<string> notUniquePropertyNames = new();
        if (propertiesToNotCheck is null || !propertiesToNotCheck.Contains(nameof(userRegister.Username)))
        {
            var isUnique = !await _context.Users.AnyAsync(u => u.Username == userRegister.Username);
            if (!isUnique)
            {
                notUniquePropertyNames.Add(nameof(userRegister.Username));
            }
        }
        if (propertiesToNotCheck is null || !propertiesToNotCheck.Contains(nameof(userRegister.Email)))
        {
            var isUnique = !await _context.Users.AnyAsync(u => u.Email.ToLower() == userRegister.Email.ToLower());
            if (!isUnique)
            {
                notUniquePropertyNames.Add(nameof(userRegister.Email));
            }
        }
        return notUniquePropertyNames.Any() ? ((bool result, List<string> notUniquePropertyNames))(false, notUniquePropertyNames) : ((bool result, List<string> notUniquePropertyNames))(true, notUniquePropertyNames);
    }
}
