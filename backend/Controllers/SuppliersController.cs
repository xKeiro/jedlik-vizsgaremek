using backend.Dtos.Supplires;
using backend.Interfaces.Services;
using backend.Models;
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
    [HttpGet]
    [Authorize (Roles = "Admin")]
    [Route("{id}")]
    public async Task<ActionResult<SupplierPublic>> Find(ulong id)
        => (await _service.Find(id)).Match(Ok, Problem);
    [HttpPut]
    [Authorize (Roles = "Admin")]
    [Route("{id}")]
    public async Task<ActionResult<SupplierPublic>> Update(ulong id, SupplierRegister supplierRegister)
        => (await _service.Update(id, supplierRegister)).Match(Ok, Problem);
    [HttpDelete]
    [Authorize (Roles = "Admin")]
    [Route("{id}")]
    public async Task<ActionResult<StatusMessage>> Delete(ulong id)
    {
        var result = await _service.Delete(id);
        return result.StatusCode == 200
            ? Ok(result)
            : Problem(result);
    }

}
