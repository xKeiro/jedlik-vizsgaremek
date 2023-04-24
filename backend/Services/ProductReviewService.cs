using AutoMapper;
using backend.Dtos.Products.ProductReviews;
using backend.Interfaces.Services;
using backend.Models;
using backend.Models.Products;
using Microsoft.EntityFrameworkCore;
using OneOf;

namespace backend.Services;

public class ProductReviewService: IProductReviewService
{
    private readonly JedlikContext _context;
    private readonly IMapper _mapper;
    private readonly IStatusMessageService _statusMessage;

    public ProductReviewService(JedlikContext context, IMapper mapper, IStatusMessageService statusMessage, IJwtTokenGeneratorService jwtTokenGeneratorService)
    {
        _context = context;
        _mapper = mapper;
        _statusMessage = statusMessage;
    }

    public async IAsyncEnumerable<ProductReviewPublic> GetAll()
    {
        var productReviews = _context.ProductReviews
            .OrderByDescending(pr => pr.CreatedAt)
            .AsAsyncEnumerable();
        await foreach (var productReview in productReviews)
        {
            yield return _mapper.Map<ProductReview, ProductReviewPublic>(productReview);
        }
    }
    public async Task<OneOf<ProductReviewPublic, StatusMessage>> Find(ulong productReviewId)
    {
        var productReview = await _context.ProductReviews
            .FirstOrDefaultAsync(pr => pr.Id == productReviewId);
        if (productReview == null)
        {
            return _statusMessage.NotFound404<ProductReview>(productReviewId);
        }
        return _mapper.Map<ProductReview, ProductReviewPublic>(productReview);
    }
    public async Task<StatusMessage> Delete(ulong productReviewId)
    {
        var productReview = await _context.ProductReviews
            .FirstOrDefaultAsync(pr => pr.Id == productReviewId);
        if (productReview == null)
        {
            return _statusMessage.NotFound404<ProductReview>(productReviewId);
        }
        _context.ProductReviews.Remove(productReview);
        _ = await _context.SaveChangesAsync();
        return _statusMessage.Deleted200<ProductReview>(productReviewId);
    }
    public async Task<OneOf<List<ProductReviewPublic>, StatusMessage>> GetByProductId(ulong productId)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == productId);
        if (product == null)
        {
            return _statusMessage.NotFound404<Product>(productId);
        }
        var productReviews = _context.ProductReviews
            .Where(pr => pr.Product.Id == productId)
            .OrderByDescending(pr => pr.CreatedAt)
            .Select(pr => _mapper.Map<ProductReview, ProductReviewPublic>(pr))
            .ToListAsync();
        return await productReviews;

    }
}
