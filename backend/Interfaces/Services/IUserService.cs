using backend.Dtos.Auth;
using backend.Dtos.Users;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IUserService
{
    Task<OneOf<UserPublic, StatusMessage>> FindById(ulong userId);
    Task<OneOf<UserPublic, StatusMessage>> Update(ulong userId, UserRegister userRegister);
    IAsyncEnumerable<UserPublic> GetAll();
}