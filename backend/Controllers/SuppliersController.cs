using backend.Dtos.Products.ProductSuppliers;
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
    private readonly ISupplierService _supplierService;
    private readonly IProductSupplierService _productSupplierService;

    public SuppliersController(ISupplierService supplierService, IProductSupplierService productSupplierService)
    {
        _supplierService = supplierService;
        _productSupplierService = productSupplierService;
    }
    [HttpGet]
    [Authorize (Roles = "Admin")]
    public ActionResult<IAsyncEnumerable<SupplierPublic>> GetAll()
        => Ok(_supplierService.GetAll());
    [HttpPost]
    [Authorize (Roles = "Admin")]
    public async Task<ActionResult<SupplierPublic>> Add(SupplierRegister supplierRegister)
        => (await _supplierService.Add(supplierRegister)).Match(Created, Problem);
    [HttpGet]
    [Authorize (Roles = "Admin")]
    [Route("{id}")]
    public async Task<ActionResult<SupplierPublic>> Find(ulong id)
        => (await _supplierService.Find(id)).Match(Ok, Problem);
    [HttpPut]
    [Authorize (Roles = "Admin")]
    [Route("{id}")]
    public async Task<ActionResult<SupplierPublic>> Update(ulong id, SupplierRegister supplierRegister)
        => (await _supplierService.Update(id, supplierRegister)).Match(Ok, Problem);
    [HttpDelete]
    [Authorize (Roles = "Admin")]
    [Route("{id}")]
    public async Task<ActionResult<StatusMessage>> Delete(ulong id)
    {
        var result = await _supplierService.Delete(id);
        return result.StatusCode == 200
            ? Ok(result)
            : Problem(result);
    }
    [HttpGet("Product/{productId}")]
    [Authorize(Roles = "Admin")]
    public ActionResult<IAsyncEnumerable<ProductSupplierPublic>> GetAllSuppliersForProduct(ulong productId)
        => Ok(_productSupplierService.GetAllForProduct(productId));
    [HttpPost("Product/{productId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductSupplierLimited>> AddProductSupplier(ulong productId, ProductSupplierRegister productSupplierRegister)
        => (await _productSupplierService.Add(productId, productSupplierRegister)).Match(Created, Problem);
    [HttpDelete("{supplierId}/Product/{productId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<StatusMessage>> DeleteProductSupplier(ulong productId, ulong supplierId)
    {
        var result = await _productSupplierService.Delete(productId, supplierId);
        return result.StatusCode == 200
            ? Ok(result)
            : Problem(result);
    }

}
