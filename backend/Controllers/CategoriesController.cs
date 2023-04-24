using backend.Conventions;
using backend.Dtos.Products.ProductCategories;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
[ApiConventionType(typeof(JedlikBasicApiConventions<ProductCategoryPublic, ProductCategoryWithoutId>))]
public class CategoriesController : ApiControllerBase
{
    private readonly IProductCategoryService _service;

    public CategoriesController(IProductCategoryService productCategoryService)
    {
        _service = productCategoryService;
    }

    [HttpGet]
    public async Task<ActionResult<IAsyncEnumerable<ProductCategoryPublic>>> GetAll()
        => Ok(await _service.GetAll());

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductCategoryPublic>> Add(ProductCategoryWithoutId productCategoryWithoutId)
        => (await _service.Add(productCategoryWithoutId)).Match(Created, Problem);

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductCategoryPublic>> Get(ulong id)
        => (await _service.Find(id)).Match(Ok, Problem);

    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductCategoryPublic>> Update(ProductCategoryPublic productCategoryPublic)
        => (await _service.Update(productCategoryPublic)).Match(Ok, Problem);
}