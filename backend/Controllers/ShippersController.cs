using backend.Dtos.Shippers;
using backend.Interfaces.Services;
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
}
