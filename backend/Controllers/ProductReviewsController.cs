using backend.Dtos.Products.ProductReviews;
using backend.Interfaces.Services;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductReviewsController : ApiControllerBase
{
    private readonly IProductReviewService _service;

    public ProductReviewsController(IProductReviewService productReviewService)
    {
        _service = productReviewService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public ActionResult<IAsyncEnumerable<ProductReviewPublic>> GetAll()
        => Ok(_service.GetAll());
    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<ProductReviewPublic>> Get(ulong id)
        => (await _service.Find(id)).Match(Ok, Problem);
    [HttpDelete]
    [Route("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<StatusMessage>> Delete(ulong id)
    {
        var result = await _service.Delete(id);
        return result.StatusCode == 200
            ? Ok(result)
            : Problem(result);
    }
    [HttpGet]
    [Route("Product/{productId}")]
    public async Task<ActionResult<List<ProductReviewPublic>>> GetByProductId(ulong productId)
        => (await _service.GetByProductId(productId)).Match(Ok, Problem);
}
