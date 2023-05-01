using backend.Dtos.Shippers;
using backend.Interfaces.Services;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

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
    [OutputCache(Duration = 120)]
    public async Task<ActionResult<List<ShipperPublic>>> GetAll()
        => Ok(await _shipperService.GetAll());
    [HttpPost]
    [Authorize (Roles = "Admin")]
    public async Task<ActionResult<ShipperPublic>> Add(ShipperRegister shipperRegister)
        => (await _shipperService.Add(shipperRegister)).Match(Created, Problem);
    [HttpGet]
    [Route("{id}")]
    [OutputCache(Duration = 60)]
    public async Task<ActionResult<ShipperPublic>> Get(ulong id)
        => (await _shipperService.Find(id)).Match(Ok, Problem);
    [HttpPut]
    [Authorize (Roles = "Admin")]
    [Route("{id}")]
    public async Task<ActionResult<ShipperPublic>> Update(ulong id, ShipperRegister shipperRegister)
        => (await _shipperService.Update(id, shipperRegister)).Match(Ok, Problem);
    [HttpDelete]
    [Authorize (Roles = "Admin")]
    [Route("{id}")]
    public async Task<ActionResult<StatusMessage>> Delete(ulong id)
    {
        var result = await _shipperService.Delete(id);
        return result.StatusCode == 200
            ? Ok(result)
            : Problem(result);
    }
}
