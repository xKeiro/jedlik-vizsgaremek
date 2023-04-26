using backend.Conventions;
using backend.Dtos.Images;
using backend.Dtos.Products.ProductCategories;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
[ApiConventionType(typeof(ProductCategoryConventions<ProductCategoryRegister>))]
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
    public async Task<ActionResult<ProductCategoryPublic>> Add(ProductCategoryRegister productCategoryWithoutId)
        => (await _service.Add(productCategoryWithoutId)).Match(Created, Problem);

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductCategoryPublic>> Get(ulong id)
        => (await _service.Find(id)).Match(Ok, Problem);

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductCategoryPublic>> Update(ulong id, ProductCategoryRegister productCategoryPublic)
        => (await _service.Update(id, productCategoryPublic)).Match(Ok, Problem);
    [HttpPost("{id}/Image")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> SaveImage(ulong id, IFormFile image)
    {
        var result = await _service.SaveImage(id, image);
        return result.StatusCode == 200
            ? Ok(result)
            : Problem(result);
    }
}