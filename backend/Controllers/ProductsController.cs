using backend.Conventions;
using backend.Dtos.Products;
using backend.Interfaces.Services;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
[ApiConventionType(typeof(ProductConventions<ProductRegister>))]
public class ProductsController : ApiControllerBase
{
    private readonly IProductService _service;

    public ProductsController(IProductService service)
    {
        _service = service;
    }
    [HttpGet]
    public ActionResult<IAsyncEnumerable<ProductPublic>> GetNotDiscontinued()
        => Ok(_service.GetNotDiscontinued());
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductPublic>> Add(ProductRegister productRegister)
     => (await _service.Add(productRegister)).Match(Created, Problem);
    [HttpGet]
    [Route("Category/{categoryId}")]
    public ActionResult<IAsyncEnumerable<ProductPublic>> GetNotDiscontinuedByCategoryId(ulong categoryId)
        => Ok(_service.GetNotDiscontinuedByCategoryId(categoryId));
    [HttpGet]
    [Route("Featured")]
    public ActionResult<IAsyncEnumerable<ProductPublic>> GetFeatured()
        => Ok(_service.GetFeatured());
    [HttpGet]
    [Route("All")]
    [Authorize(Roles = "Admin")]
    public ActionResult<IAsyncEnumerable<ProductPublic>> GetAll()
        => Ok(_service.GetAll());
    [HttpGet]
    [Route("{productId}")]
    public async Task<ActionResult<ProductPublic>> GetById(ulong productId)
        => (await _service.FindById(productId)).Match(Ok, Problem);
    [HttpPut]
    [Route("{productId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductPublic>> Update(ulong productId, ProductRegister productRegister)
        => (await _service.Update(productId, productRegister)).Match(Ok, Problem);
    [HttpPatch]
    [Route("{productId}/Discontinue")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<StatusMessage>> Discontinue(ulong productId)
    {
        var result = await _service.Discontinue(productId);
        if (result.StatusCode == StatusCodes.Status200OK)
        {
            return Ok(result);
        }
        else
        {
            return Problem(result);
        }
    }
}
