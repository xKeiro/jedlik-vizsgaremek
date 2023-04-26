using backend.Dtos.Shippers;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ShippersController: ApiControllerBase
{
    private readonly IShipperService _shipperService;

    public ShippersController(IShipperService shipperService)
    {
        _shipperService = shipperService;
    }
    [HttpGet]
    public ActionResult<IAsyncEnumerable<ShipperPublic>> GetAll()
        => Ok(_shipperService.GetAll());
    [HttpPost]
    [Authorize (Roles = "Admin")]
    public async Task<ActionResult<ShipperPublic>> Add(ShipperRegister shipperRegister)
        => (await _shipperService.Add(shipperRegister)).Match(Created, Problem);
    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<ShipperPublic>> Get(ulong id)
        => (await _shipperService.Find(id)).Match(Ok, Problem);
}
