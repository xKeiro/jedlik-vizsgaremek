using AutoMapper;
using backend.Dtos.Products;
using backend.Interfaces.Services;
using backend.Models;
using backend.Models.Products;
using Microsoft.EntityFrameworkCore;
using OneOf;

namespace backend.Services;

public class ProductService : IProductService
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
    public async Task<OneOf<ProductPublic, StatusMessage>> Add(ProductRegister productRegister)
    {
        var product = _mapper.Map<ProductRegister, Product>(productRegister);
        (var result, var notUniquePropertyNames) = await IsUnique(product);
        if (!result)
        {
            return _statusMessage.NotUnique<Product>(notUniquePropertyNames);
        }
        var category = await _context.ProductCategories
            .FirstOrDefaultAsync(c => c.Id == productRegister.CategoryId);
        if (category == null)
        {
            return _statusMessage.NotFound<ProductCategory>(productRegister.CategoryId);
        }
        product.Category = category;
        _ = await _context.Products.AddAsync(product);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _mapper.Map<Product, ProductPublic>(product);
    }

    private async Task<(bool result, List<string> notUniquePropertyNames)> IsUnique(Product Product)
    {
        List<string> notUniquePropertyNames = new();
        var isUnique = !await _context.ProductCategories.AnyAsync(c => c.Title.ToLower() == Product.Title.ToLower());
        if (!isUnique)
        {
            notUniquePropertyNames.Add(nameof(Product.Title));
            return (false, notUniquePropertyNames);
        }
        return (true, notUniquePropertyNames);
    }
}
