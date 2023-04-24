using backend.Dtos.Products.ProductReviews;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductReviewsController: ApiControllerBase
{
    private readonly IProductReviewService _service;

    public ProductReviewsController(IProductReviewService productReviewService)
    {
        _service = productReviewService;
    }

    [HttpGet]
    [Authorize (Roles = "Admin")]
    public ActionResult<IAsyncEnumerable<ProductReviewPublic>> GetAll()
        => Ok(_service.GetAll());
}
