using backend.Dtos.Products.ProductReviews;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IProductReviewService
{
    IAsyncEnumerable<ProductReviewPublic> GetAll();
    Task<OneOf<ProductReviewPublic, StatusMessage>> Find(ulong productReviewId);
    Task<StatusMessage> Delete(ulong productReviewId);
}
