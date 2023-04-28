using backend.Dtos.Auth;
using backend.Dtos.Images;
using backend.Dtos.Users;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IUserService
{
    Task<OneOf<UserPublic, StatusMessage>> FindById(ulong userId);
    Task<OneOf<UserPublic, StatusMessage>> Update(ulong userId, UserUpdate userUpdate);
    IAsyncEnumerable<UserPublic> GetAll();
    Task<OneOf<UserPublic, StatusMessage>> SetUserAdminStatus(ulong userId, bool shouldBeAdmin);
    Task<OneOf<ImagePublic, StatusMessage>> SaveImage(ulong userId, IFormFile image);
}