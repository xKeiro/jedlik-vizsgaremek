using backend.Dtos.Products.ProductCategories;
using backend.Interfaces.Services;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
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
    [AllowAnonymous]
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(StatusMessage))]
    public async Task<ActionResult<IEnumerable<ProductCategoryPublic>>> GetAllProductCategories()
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
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(StatusMessage))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(StatusMessage))]
    public async Task<ActionResult<ProductCategoryPublic>> AddProductCategory(ProductCategoryWithoutId productCategoryWithoutId)
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
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(StatusMessage))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(StatusMessage))]
    public async Task<ActionResult<ProductCategoryPublic>> GetProductCategoryById(ulong id)
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

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(StatusMessage))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(StatusMessage))]
    [ProducesResponseType(StatusCodes.Status409Conflict, Type = typeof(StatusMessage))]
    public async Task<ActionResult<ProductCategoryPublic>> UpdateProductCategoryById(ulong id, ProductCategoryWithoutId productCategoryWithoutId)
    {
        try
        {
            ProductCategoryPublic? productCategoryPublicOriginal = await _service.Find(id);
            if (productCategoryPublicOriginal == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, _statusMessage.NotFound(id));
            }

            return await _service.IsUnique(productCategoryWithoutId)
                ? StatusCode(StatusCodes.Status200OK, await _service.Update(id, productCategoryWithoutId))
                : StatusCode(StatusCodes.Status409Conflict, _statusMessage.NotUnique());
        }
        catch
        {
            return StatusCode(StatusCodes.Status400BadRequest, _statusMessage.GenericError());
        }
    }
}