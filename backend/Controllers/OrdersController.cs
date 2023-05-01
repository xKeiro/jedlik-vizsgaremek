using backend.Conventions;
using backend.Dtos.Orders;
using backend.Enums;
using backend.Interfaces.Services;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using OneOf;
using System.Security.Claims;

namespace backend.Controllers;
[Route("api/[controller]")]
[ApiController]
[ApiConventionType(typeof(OrderConventions<OrderRegister>))]
public class OrdersController : ApiControllerBase
{
    private readonly IOrdersService _service;

    public OrdersController(IOrdersService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<OrderAdmin>>> GetAll()
        => Ok(await _service.GetAll());
    [HttpGet("Me")]
    [Authorize]
    [OutputCache(Duration = 60)]
    public async Task<ActionResult<List<OrderPublic>>> GetAllOfMine()
    {
        var userId = ulong.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return Ok(await _service.GetAllByUserId(userId));
    }
    [HttpGet("Me/{orderId}")]
    [Authorize]
    [OutputCache(Duration = 120)]
    public async Task<ActionResult<OneOf<OrderPublic, StatusMessage>>> FindMyOrder(ulong orderId)
    {
        var userId = ulong.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return (await _service.FindMyOrder(userId, orderId)).Match(Ok, Problem);
    }
    [HttpGet("{orderId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<OneOf<OrderAdmin, StatusMessage>>> FindByOrderId(ulong orderId)
        => (await _service.FindByOrderId(orderId)).Match(Ok, Problem);
    [HttpPatch("{orderId}/Status")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<OneOf<OrderAdmin, StatusMessage>>> SetOrderStatus(ulong orderId, OrderStatus status)
        => (await _service.SetOrderStatus(orderId, status)).Match(Ok, Problem);
    [HttpPost("Checkout")]
    [Authorize]
    public async Task<ActionResult<OneOf<OrderPublic, StatusMessage>>> Add(OrderRegister orderRegister)
    {
        var userId = ulong.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        return (await _service.Add(userId, orderRegister)).Match(Created, Problem);
    }

}
