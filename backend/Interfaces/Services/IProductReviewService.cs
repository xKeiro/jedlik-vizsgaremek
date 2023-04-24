using backend.Dtos.Products.ProductReviews;

namespace backend.Interfaces.Services;

public interface IProductReviewService
{
    IAsyncEnumerable<ProductReviewPublic> GetAll();
}
