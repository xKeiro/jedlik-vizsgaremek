using backend.Dtos.Auth;
using backend.Models;
using Microsoft.Identity.Client;
using OneOf;

namespace backend.Interfaces.Services;

public interface IAuthService
{
    Task<OneOf<AuthResult, StatusMessage>> Register(UserRegister userRegister);
    Task<OneOf<AuthResult, StatusMessage>> Login(UserLogin userLogin);
}