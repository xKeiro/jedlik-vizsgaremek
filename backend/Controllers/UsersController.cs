using backend.Conventions;
using backend.Dtos.Users;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
[ApiConventionType(typeof(UserConventions))]
public class UsersController: ApiControllerBase
{
    private readonly IUserService _service;

    public UsersController(IUserService service)
    {
        _service = service;
    }

    [HttpGet("Me")]
    [Authorize]
    public async Task<ActionResult<UserPublic>> GetMe()
    {
        var userId = ulong.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _service.FindById(userId);
        return result.Match(Ok, Problem);
    }

}
