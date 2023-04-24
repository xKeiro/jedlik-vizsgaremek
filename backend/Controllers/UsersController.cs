using backend.Conventions;
using backend.Dtos.Auth;
using backend.Dtos.Users;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
[ApiConventionType(typeof(UserConventions<UserRegister>))]
public class UsersController : ApiControllerBase
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
        return (await _service.FindById(userId)).Match(Ok, Problem);
    }
    [HttpPut("Me")]
    [Authorize]
    public async Task<ActionResult<UserPublic>> UpdateMe(UserUpdate userUpdate)
    {
        var userId = ulong.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _service.Update(userId, userUpdate);
        return result.Match(Ok, Problem);
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public ActionResult<IAsyncEnumerable<UserPublic>> GetAll()
        => Ok(_service.GetAll());

    [HttpGet]
    [Route("{userId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UserPublic>> GetById(ulong userId)
        => (await _service.FindById(userId)).Match(Ok, Problem);

    [HttpPatch]
    [Route("Promote/{userId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UserPublic>> MakeAdmin(ulong userId)
        => (await _service.SetUserAdminStatus(userId, true)).Match(Ok, Problem);
    [HttpPatch]
    [Route("Demote/{userId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<UserPublic>> LoseAdmin(ulong userId)
        => (await _service.SetUserAdminStatus(userId, false)).Match(Ok, Problem);
}
