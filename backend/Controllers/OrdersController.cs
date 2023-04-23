using backend.Dtos.Orders;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers;
[Route("api/[controller]")]
[ApiController]
public class OrdersController : ApiControllerBase
{
    private readonly IOrdersService _service;

    public OrdersController(IOrdersService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public ActionResult<IAsyncEnumerable<OrderPublic>> GetAll()
        => Ok(_service.GetAll());
    [HttpGet]
    [Route("Me")]
    [Authorize]
    public ActionResult<IAsyncEnumerable<OrderPublic>> GetAllOfMine()
    {
        var userId = ulong.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(_service.GetAllByUserId(userId));
    }
}
