using AutoMapper;
using backend.Dtos.Products.ProductCategories;
using backend.Interfaces.Services;
using backend.Models.Products;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class ProductCategoryService : IProductCategoryService
{
    private readonly JedlikContext _context;
    private readonly IMapper _mapper;

    public ProductCategoryService(JedlikContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ProductCategoryPublic> Add(ProductCategoryWithoutId productCategoryWithoutId)
    {
        ProductCategory productCategory = _mapper.Map<ProductCategoryWithoutId, ProductCategory>(productCategoryWithoutId);
        _ = await _context.ProductCategories.AddAsync(productCategory);
        _ = await _context.SaveChangesAsync();
        return _mapper.Map<ProductCategory, ProductCategoryPublic>(productCategory);
    }

    public async Task<ProductCategoryPublic?> Find(ulong id)
    {
        ProductCategory? productCategory = await _context.ProductCategories
        .AsNoTracking()
        .FirstOrDefaultAsync(c => c.Id == id);
        return productCategory != null ? _mapper.Map<ProductCategory, ProductCategoryPublic>(productCategory) : null;
    }

    public async Task<List<ProductCategoryPublic>> GetAll()
    {
        List<ProductCategory> productCategories = await _context
        .ProductCategories
        .OrderBy(productCategory => productCategory.Title)
        .AsNoTracking()
        .ToListAsync();
        return _mapper.Map<List<ProductCategory>, List<ProductCategoryPublic>>(productCategories);
    }

    public async Task<bool> IsUnique(ProductCategoryPublic productCategoryWithoutId)
    {
        ProductCategory productCategory = _mapper.Map<ProductCategoryWithoutId, ProductCategory>(productCategoryWithoutId);
        return !await _context.ProductCategories.AnyAsync(c => c.Title.ToLower() == productCategory.Title.ToLower());
    }

    public async Task<bool> IsUnique(ProductCategoryWithoutId productCategoryWithoutId)
    {
        ProductCategory productCategory = _mapper.Map<ProductCategoryWithoutId, ProductCategory>(productCategoryWithoutId);
        return !await _context.ProductCategories.AnyAsync(c => c.Title.ToLower() == productCategory.Title.ToLower());
    }

    public async Task<ProductCategoryPublic> Update(ulong id, ProductCategoryWithoutId productCategoryWithoutId)
    {
        ProductCategory productCategory = _mapper.Map<ProductCategoryWithoutId, ProductCategory>(productCategoryWithoutId);
        productCategory.Id = id;
        _ = _context.Update(productCategory);
        _ = await _context.SaveChangesAsync();
        return _mapper.Map<ProductCategory, ProductCategoryPublic>(productCategory);
    }
}
