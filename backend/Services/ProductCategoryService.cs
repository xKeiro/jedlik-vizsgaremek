using AutoMapper;
using backend.Dtos.Products.ProductCategories;
using backend.Interfaces.Services;
using backend.Models;
using backend.Models.Products;
using Microsoft.EntityFrameworkCore;
using OneOf;

namespace backend.Services;

public class ProductCategoryService : IProductCategoryService
{
    private readonly JedlikContext _context;
    private readonly IMapper _mapper;
    private readonly IStatusMessageService _statusMessage;

    public ProductCategoryService(JedlikContext context, IMapper mapper, IStatusMessageService statusMessage)
    {
        _context = context;
        _mapper = mapper;
        _statusMessage = statusMessage;
    }

    public async Task<OneOf<ProductCategoryPublic, StatusMessage>> Add(ProductCategoryWithoutId productCategoryWithoutId)
    {
        var productCategory = _mapper.Map<ProductCategoryWithoutId, ProductCategory>(productCategoryWithoutId);
        (var Result, var NotUniquePropertyNames) = await IsUnique(productCategory);
        if (!Result)
        {
            return _statusMessage.NotUnique<ProductCategory>(NotUniquePropertyNames);
        }
        _ = await _context.ProductCategories.AddAsync(productCategory);
        _ = await _context.SaveChangesAsync();
        return _mapper.Map<ProductCategory, ProductCategoryPublic>(productCategory);
    }

    public async Task<OneOf<ProductCategoryPublic, StatusMessage>> Find(ulong id)
    {
        var productCategory = await _context.ProductCategories
        .AsNoTracking()
        .FirstOrDefaultAsync(c => c.Id == id);
        return productCategory == null ? (OneOf<ProductCategoryPublic, StatusMessage>)_statusMessage.NotFound<ProductCategory>(id) : (OneOf<ProductCategoryPublic, StatusMessage>)_mapper.Map<ProductCategory, ProductCategoryPublic>(productCategory);
    }

    public async Task<List<ProductCategoryPublic>> GetAll()
    {
        var productCategories = await _context
        .ProductCategories
        .OrderBy(productCategory => productCategory.Title)
        .AsNoTracking()
        .ToListAsync();
        return _mapper.Map<List<ProductCategory>, List<ProductCategoryPublic>>(productCategories);
    }
    public async Task<OneOf<ProductCategoryPublic, StatusMessage>> Update(ProductCategoryPublic productCategoryPublic)
    {
        var productCategoryExists = _context.ProductCategories
            .AsNoTracking()
            .Any(c => c.Id == productCategoryPublic.Id);
        if (!productCategoryExists)
        {
            return _statusMessage.NotFound<ProductCategory>(productCategoryPublic.Id);
        }

        var productCategory = _mapper.Map<ProductCategoryPublic, ProductCategory>(productCategoryPublic);
        var (result, notUniquePropertyNames) = await IsUnique(productCategory);
        if (!result)
        {
            return _statusMessage.NotUnique<ProductCategory>(notUniquePropertyNames);
        }
        productCategory.Id = productCategoryPublic.Id;
        _ = _context.Update(productCategory);
        _ = await _context.SaveChangesAsync();
        return _mapper.Map<ProductCategory, ProductCategoryPublic>(productCategory);
    }

    private async Task<(bool result, List<string> notUniquePropertyNames)> IsUnique(ProductCategory productCategory)
    {
        List<string> notUniquePropertyNames = new();
        var isUnique = !await _context.ProductCategories.AnyAsync(c => c.Title.ToLower() == productCategory.Title.ToLower());
        if (!isUnique)
        {
            notUniquePropertyNames.Add(nameof(productCategory.Title));
            return (false, notUniquePropertyNames);
        }
        return (true, notUniquePropertyNames);
    }

}
