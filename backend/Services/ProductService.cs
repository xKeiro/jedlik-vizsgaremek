using AutoMapper;
using backend.Dtos.Products;
using backend.Interfaces.Services;
using backend.Models.Products;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class ProductService: IProductService
{
    private readonly JedlikContext _context;
    private readonly IMapper _mapper;
    private readonly IStatusMessageService _statusMessage;

    public ProductService(JedlikContext context, IMapper mapper, IStatusMessageService statusMessage, IJwtTokenGeneratorService jwtTokenGeneratorService)
    {
        _context = context;
        _mapper = mapper;
        _statusMessage = statusMessage;
    }

    public IAsyncEnumerable<ProductPublic> GetNotDiscontinued() 
        => _context.Products
            .Where(p => !p.Discontinued)
            .Select(p => _mapper.Map<Product, ProductPublic>(p))
            .AsAsyncEnumerable();
}
