using backend.Dtos.Products;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
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
     => (await _service.Add(productRegister)).Match(Ok, Problem);
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
}
