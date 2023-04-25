using backend.Dtos.Supplires;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SuppliersController: ApiControllerBase
{
    private readonly ISupplierService _service;

    public SuppliersController(ISupplierService service)
    {
        _service = service;
    }
    [HttpGet]
    [Authorize (Roles = "Admin")]
    public ActionResult<IAsyncEnumerable<SupplierPublic>> GetAll()
        => Ok(_service.GetAll());
    [HttpPost]
    [Authorize (Roles = "Admin")]
    public async Task<ActionResult<SupplierPublic>> Add(SupplierRegister supplierRegister)
        => (await _service.Add(supplierRegister)).Match(Created, Problem);
}
