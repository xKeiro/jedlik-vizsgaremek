using backend.Conventions;
using backend.Dtos.Auth;
using backend.Dtos.Users;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;
[Route("api/[controller]")]
[ApiController]
[ApiConventionType(typeof(AuthConventions))]
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
            return Problem(result.AsT1);
        }
        Response.Cookies.Append("token", result.AsT0.JwtToken, result.AsT0.cookieOptionForJwt);
        return Ok(result.AsT0.UserPublic);
    }

    [HttpPost("Login")]
    public async Task<ActionResult<UserPublic>> Login(UserLogin loginDto)
    {
        var result = await _service.Login(loginDto);
        if (result.IsT1)
        {
            return Problem(result.AsT1);
        }
        Response.Cookies.Append("token", result.AsT0.JwtToken, result.AsT0.cookieOptionForJwt);
        return Ok(result.AsT0.UserPublic);
    }
}
