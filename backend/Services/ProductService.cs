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
            .Include(p => p.Category)
            .Where(p => !p.Discontinued)
            .OrderByDescending(p => p.ProductOrders!.Count)
            .ThenByDescending(p => p.BasePrice * (1 - p.Discount / 100))
            .ThenBy(p => p.Title)
            .Select(p => _mapper.Map<Product, ProductPublic>(p))
            .AsAsyncEnumerable();
    public async Task<OneOf<ProductPublic, StatusMessage>> Add(ProductRegister productRegister)
    {
        var product = _mapper.Map<ProductRegister, Product>(productRegister);
        (var isUnique, var notUniquePropertyNames) = await IsUnique(product);
        if (!isUnique)
        {
            return _statusMessage.NotUnique<Product>(notUniquePropertyNames);
        }
        if (IsDiscontinuedAndFeaturedAtTheSameTime(product))
        {
            return _statusMessage.ProductCannotBeDiscontinuedAndFeaturedAtTheSameTime();
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

    public IAsyncEnumerable<ProductPublic> GetNotDiscontinuedByCategoryId(ulong categoryId)
        => _context.Products
            .Include(p => p.Category)
            .Where(p => !p.Discontinued && p.Category.Id == categoryId)
            .OrderByDescending(p => p.ProductOrders!.Count)
            .ThenByDescending(p => p.BasePrice * (1 - p.Discount / 100))
            .ThenBy(p => p.Title)
            .Select(p => _mapper.Map<Product, ProductPublic>(p))
            .AsAsyncEnumerable();

    public IAsyncEnumerable<ProductPublic> GetFeatured() 
        => _context.Products
            .Include(p => p.Category)
            .Where(p => p.Featured)
            .OrderByDescending(p => p.ProductOrders!.Count)
            .ThenByDescending(p => p.BasePrice * (1 - p.Discount / 100))
            .ThenBy(p => p.Title)
            .Select(p => _mapper.Map<Product, ProductPublic>(p))
            .AsAsyncEnumerable();
    public IAsyncEnumerable<ProductPublic> GetAll()
        => _context.Products
            .Include(p => p.Category)
            .OrderBy(p => p.Title)
            .Select(p => _mapper.Map<Product, ProductPublic>(p))
            .AsAsyncEnumerable();

    private bool IsDiscontinuedAndFeaturedAtTheSameTime(Product product)
        => product.Discontinued && product.Featured;
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
