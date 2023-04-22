using backend.Dtos.Users;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IUserService
{
    Task<OneOf<UserPublic, StatusMessage>> FindById(ulong userId);
}