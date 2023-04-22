using backend.Dtos.Auth;
using backend.Dtos.Users;
using backend.Interfaces.Services;
using backend.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NuGet.Common;

namespace backend.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthController : ApiControllerBase
{
    private readonly IAuthService _service;

    public AuthController(IAuthService service)
    {
        _service = service;
    }

    [HttpPost("Register")]
    public async Task<ActionResult<UserPublic>> Register(UserRegister registerDto)
    {
        var result = await _service.Register(registerDto);
        if (result.IsT1)
        {
            return (ActionResult)Problem(result.AsT1);
        }
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.Strict,
            Secure = true,
            Expires = DateTime.Now.AddDays(EnvironmentVariableHelper.JwtTokenExpirationDay)
        };
        Response.Cookies.Append("token", result.AsT0.JwtToken, cookieOptions);
        return Ok(result.AsT0.UserPublic);
    }
}
