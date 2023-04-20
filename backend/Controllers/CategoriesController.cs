using backend.Conventions;
using backend.Dtos.Products.ProductCategories;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
[ApiConventionType(typeof(JedlikBasicApiConventions<ProductCategoryPublic, ProductCategoryWithoutId>))]
public class CategoriesController : ControllerBase
{
    private readonly IProductCategoryService _service;
    private readonly IStatusMessageService _statusMessage;

    public CategoriesController(
        IProductCategoryService ingredientService,
        IStatusMessageService statusMessage)
    {
        _service = ingredientService;
        _statusMessage = statusMessage;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductCategoryPublic>>> GetAll()
    {
        try
        {
            List<ProductCategoryPublic> productCategoriesPublic = await _service.GetAll();
            return StatusCode(StatusCodes.Status200OK, productCategoriesPublic);
        }
        catch
        {
            return StatusCode(StatusCodes.Status400BadRequest, _statusMessage.GenericError());
        }
    }

    [HttpPost]
    public async Task<ActionResult<ProductCategoryPublic>> Add(ProductCategoryWithoutId productCategoryWithoutId)
    {
        try
        {
            return await _service.IsUnique(productCategoryWithoutId)
                ? StatusCode(StatusCodes.Status201Created, await _service.Add(productCategoryWithoutId))
                : StatusCode(StatusCodes.Status409Conflict, _statusMessage.NotUnique());
        }
        catch
        {
            return StatusCode(StatusCodes.Status400BadRequest, _statusMessage.GenericError());
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductCategoryPublic>> Get(ulong id)
    {
        try
        {
            ProductCategoryPublic? productCategoryPublic = await _service.Find(id);
            return productCategoryPublic != null
                ? StatusCode(StatusCodes.Status200OK, productCategoryPublic)
                : StatusCode(StatusCodes.Status404NotFound, _statusMessage.NotFound(id));
        }
        catch
        {
            return StatusCode(StatusCodes.Status400BadRequest, _statusMessage.GenericError());
        }
    }

    [HttpPut]
    public async Task<ActionResult<ProductCategoryPublic>> Update(ProductCategoryPublic productCategoryPublic)
    {
        try
        {
            ProductCategoryPublic? productCategoryPublicOriginal = await _service.Find(productCategoryPublic.Id);
            if (productCategoryPublicOriginal == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, _statusMessage.NotFound(productCategoryPublic.Id));
            }

            return await _service.IsUnique(productCategoryPublic)
                ? StatusCode(StatusCodes.Status200OK, await _service.Update(productCategoryPublic))
                : StatusCode(StatusCodes.Status409Conflict, _statusMessage.NotUnique());
        }
        catch
        {
            return StatusCode(StatusCodes.Status400BadRequest, _statusMessage.GenericError());
        }
    }
}