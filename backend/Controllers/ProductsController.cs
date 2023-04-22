using backend.Dtos.Products;
using backend.Interfaces.Services;
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
}
