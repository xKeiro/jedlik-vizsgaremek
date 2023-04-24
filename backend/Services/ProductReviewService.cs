using AutoMapper;
using backend.Dtos.Products.ProductReviews;
using backend.Interfaces.Services;
using backend.Models.Products;
using Microsoft.EntityFrameworkCore;

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

    public IAsyncEnumerable<ProductReviewPublic> GetAll()
        => _context.ProductReviews
            .Select(pr => _mapper.Map<ProductReview, ProductReviewPublic>(pr))
            .OrderByDescending(pr => pr.CreatedAt)
            .AsAsyncEnumerable();
}
