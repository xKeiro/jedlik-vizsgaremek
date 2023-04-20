using backend.Conventions;
using backend.Dtos.Products.ProductCategories;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
[ApiConventionType(typeof(JedlikBasicApiConventions<ProductCategoryPublic, ProductCategoryWithoutId>))]
public class CategoriesController : ApiControllerBase
{
    private readonly IProductCategoryService _service;

    public CategoriesController(IProductCategoryService ingredientService)
    {
        _service = ingredientService;
    }
    [HttpGet]
    public async Task<ActionResult<IAsyncEnumerable<ProductCategoryPublic>>> GetAll()
        => Ok(await _service.GetAll());


    [HttpPost]
    public async Task<ActionResult<ProductCategoryPublic>> Add(ProductCategoryWithoutId productCategoryWithoutId)
        => (ActionResult)(await _service.Add(productCategoryWithoutId)).Match(Ok, Problem);

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductCategoryPublic>> Get(ulong id)
        => (ActionResult)(await _service.Find(id)).Match(Ok, Problem);

    [HttpPut]
    public async Task<ActionResult<ProductCategoryPublic>> Update(ProductCategoryPublic productCategoryPublic)
        => (ActionResult)(await _service.Update(productCategoryPublic)).Match(Ok, Problem);
}