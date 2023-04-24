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
}
