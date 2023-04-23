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
            .ThenByDescending(p => p.BasePrice * (1 - (p.Discount / 100)))
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
            .ThenByDescending(p => p.BasePrice * (1 - (p.Discount / 100)))
            .ThenBy(p => p.Title)
            .Select(p => _mapper.Map<Product, ProductPublic>(p))
            .AsAsyncEnumerable();

    public IAsyncEnumerable<ProductPublic> GetFeatured()
        => _context.Products
            .Include(p => p.Category)
            .Where(p => p.Featured)
            .OrderByDescending(p => p.ProductOrders!.Count)
            .ThenByDescending(p => p.BasePrice * (1 - (p.Discount / 100)))
            .ThenBy(p => p.Title)
            .Select(p => _mapper.Map<Product, ProductPublic>(p))
            .AsAsyncEnumerable();
    public IAsyncEnumerable<ProductPublic> GetAll()
        => _context.Products
            .Include(p => p.Category)
            .OrderBy(p => p.Title)
            .Select(p => _mapper.Map<Product, ProductPublic>(p))
            .AsAsyncEnumerable();
    public async Task<OneOf<ProductPublic, StatusMessage>> FindById(ulong productId)
    {
        var product = await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == productId);
        return product == null ? (OneOf<ProductPublic, StatusMessage>)_statusMessage.NotFound<Product>(productId) : (OneOf<ProductPublic, StatusMessage>)_mapper.Map<Product, ProductPublic>(product);
    }
    public async Task<OneOf<ProductPublic, StatusMessage>> Update(ulong productId, ProductRegister productRegister)
    {
        var product = await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == productId);
        if (product == null)
        {
            return _statusMessage.NotFound<Product>(productId);
        }
        if (productRegister.Title != product.Title)
        {
            var productToCheck = _mapper.Map<ProductRegister, Product>(productRegister);
            (var isUnique, var notUniquePropertyNames) = await IsUnique(productToCheck);
            if (!isUnique)
            {
                return _statusMessage.NotUnique<Product>(notUniquePropertyNames);
            }
        }
        var productToUpdate = _mapper.Map(productRegister, product);
        if (IsDiscontinuedAndFeaturedAtTheSameTime(productToUpdate))
        {
            return _statusMessage.ProductCannotBeDiscontinuedAndFeaturedAtTheSameTime();
        }
        var category = await _context.ProductCategories
            .FirstOrDefaultAsync(c => c.Id == productRegister.CategoryId);
        if (category == null)
        {
            return _statusMessage.NotFound<ProductCategory>(productRegister.CategoryId);
        }
        productToUpdate.Category = category;
        _ = _context.Products.Update(productToUpdate);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _mapper.Map<Product, ProductPublic>(productToUpdate);
    }
    public async Task<StatusMessage> Discontinue(ulong productId)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == productId);
        if (product == null)
        {
            return _statusMessage.NotFound<Product>(productId);
        }
        product.Discontinued = true;
        product.Featured = false;
        _ = _context.Products.Update(product);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _statusMessage.ProductDiscontinued(productId);
    }


    private bool IsDiscontinuedAndFeaturedAtTheSameTime(Product product)
        => product.Discontinued && product.Featured;
    private async Task<(bool result, List<string> notUniquePropertyNames)> IsUnique(Product product)
    {
        List<string> notUniquePropertyNames = new();
        var isUnique = !await _context.Products.AnyAsync(p => p.Title.ToLower() == product.Title.ToLower());
        if (!isUnique)
        {
            notUniquePropertyNames.Add(nameof(Product.Title));
            return (false, notUniquePropertyNames);
        }
        return (true, notUniquePropertyNames);
    }
}
