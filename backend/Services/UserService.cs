using AutoMapper;
using backend.Dtos.Auth;
using backend.Dtos.Images;
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
    private readonly IImageService _imageService;
    public UserService(JedlikContext context, IStatusMessageService statusMessage, IMapper mapper, IImageService imageService)
    {
        _context = context;
        _statusMessage = statusMessage;
        _mapper = mapper;
        _imageService = imageService;
    }
    public async Task<OneOf<UserPublic, StatusMessage>> FindById(ulong userId)
    {
        var user = await _context.Users.FindAsync(userId);
        return user == null
            ? _statusMessage.NotFound404<User>(userId)
            : _mapper.Map<User, UserPublic>(user);
    }
    public async Task<OneOf<UserPublic, StatusMessage>> Update(ulong userId, UserUpdate userUpdate)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return _statusMessage.NotFound404<User>(userId);
        }
        var countryWithVat = await _context.CountriesWithVat.FirstOrDefaultAsync(cwv => cwv.Country == userUpdate.Country);
        if (countryWithVat is null)
        {
            return _statusMessage.DoesNotExist404(nameof(userUpdate.Country), userUpdate.Country);
        }
        List<string> propertiesToNotCheck = new();
        if (user.Username == userUpdate.Username)
        {
            propertiesToNotCheck.Add(nameof(user.Username));
        }
        if (user.Email == userUpdate.Email)
        {
            propertiesToNotCheck.Add(nameof(user.Email));
        }
        var (isUnique, notUniquePropertyNames) = await IsUnique(userUpdate, propertiesToNotCheck);
        if (!isUnique)
        {
            return _statusMessage.NotUnique409<User>(notUniquePropertyNames);
        }
        _ = _mapper.Map(userUpdate, user);
        user.CountryWithVat = countryWithVat;


        _ = _context.Users.Update(user);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _mapper.Map<User, UserPublic>(user);
    }

    public async IAsyncEnumerable<UserPublic> GetAll()
    {
        await foreach (var user in _context.Users.AsAsyncEnumerable())
        {
            yield return _mapper.Map<User, UserPublic>(user);
        }
    }
    public async Task<OneOf<UserPublic, StatusMessage>> SetUserAdminStatus(ulong userId, bool shouldBeAdmin)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return _statusMessage.NotFound404<User>(userId);
        }
        user.IsAdmin = shouldBeAdmin;
        _ = _context.Users.Update(user);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _mapper.Map<User, UserPublic>(user);
    }

    public async Task<OneOf<ImagePublic, StatusMessage>> SaveImage(ulong userId, IFormFile image)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(p => p.Id == userId);
        if (user == null)
        {
            return _statusMessage.NotFound404<User>(userId);
        }
        var imageSaveResult = await _imageService.SaveImage(image, userId, nameof(User));
        if (imageSaveResult.IsT1)
        {
            return imageSaveResult.AsT1;
        }
        user.ImagePath = imageSaveResult.AsT0;
        await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return new ImagePublic() { ImagePath = user.ImagePath };
    }

    private async Task<(bool result, List<string> notUniquePropertyNames)> IsUnique
        (UserUpdate userUpdate, List<string>? propertiesToNotCheck = null)
    {
        List<string> notUniquePropertyNames = new();
        if (propertiesToNotCheck is null || !propertiesToNotCheck.Contains(nameof(userUpdate.Username)))
        {
            var isUnique = !await _context.Users.AnyAsync(u => u.Username == userUpdate.Username);
            if (!isUnique)
            {
                notUniquePropertyNames.Add(nameof(userUpdate.Username));
            }
        }
        if (propertiesToNotCheck is null || !propertiesToNotCheck.Contains(nameof(userUpdate.Email)))
        {
            var isUnique = !await _context.Users.AnyAsync(u => u.Email.ToLower() == userUpdate.Email.ToLower());
            if (!isUnique)
            {
                notUniquePropertyNames.Add(nameof(userUpdate.Email));
            }
        }
        return notUniquePropertyNames.Any() ? ((bool result, List<string> notUniquePropertyNames))(false, notUniquePropertyNames) : ((bool result, List<string> notUniquePropertyNames))(true, notUniquePropertyNames);
    }
}
