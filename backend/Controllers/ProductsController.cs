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
    [HttpGet("Category/{categoryId}")]
    public ActionResult<IAsyncEnumerable<ProductPublic>> GetNotDiscontinuedByCategoryId(ulong categoryId)
        => Ok(_service.GetNotDiscontinuedByCategoryId(categoryId));
    [HttpGet("Featured")]
    public ActionResult<IAsyncEnumerable<ProductPublic>> GetFeatured()
        => Ok(_service.GetFeatured());
    [HttpGet("All")]
    [Authorize(Roles = "Admin")]
    public ActionResult<IAsyncEnumerable<ProductPublic>> GetAll()
        => Ok(_service.GetAll());
    [HttpGet("{productId}")]

    public async Task<ActionResult<ProductPublic>> GetById(ulong productId)
        => (await _service.FindById(productId)).Match(Ok, Problem);
    [HttpPut("{productId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductPublic>> Update(ulong productId, ProductRegister productRegister)
        => (await _service.Update(productId, productRegister)).Match(Ok, Problem);
    [HttpPatch("{productId}/Discontinue")]
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
    [HttpPost("{productId}/Image")]
    [Authorize(Roles = "Admin")]

    public async Task<ActionResult> SaveImage(ulong productId, IFormFile image)
    {
        var result = await _service.SaveImage(productId, image);
        return result.StatusCode == 200
            ? Ok(result)
            : Problem(result);
    }
}
