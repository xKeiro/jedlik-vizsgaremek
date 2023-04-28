using AutoMapper;
using backend.Dtos.Images;
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
    private readonly IImageService _imageService;

    public ProductCategoryService(JedlikContext context, IMapper mapper, IStatusMessageService statusMessage, IImageService imageService)
    {
        _context = context;
        _mapper = mapper;
        _statusMessage = statusMessage;
        _imageService = imageService;
    }

    public async Task<OneOf<ProductCategoryPublic, StatusMessage>> Add(ProductCategoryRegister productCategoryRegister)
    {
        var productCategory = _mapper.Map<ProductCategoryRegister, ProductCategory>(productCategoryRegister);
        (var result, var notUniquePropertyNames) = await IsUnique(productCategoryRegister);
        if (!result)
        {
            return _statusMessage.NotUnique409<ProductCategory>(notUniquePropertyNames);
        }
        _ = await _context.ProductCategories.AddAsync(productCategory);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _mapper.Map<ProductCategory, ProductCategoryPublic>(productCategory);
    }

    public async Task<OneOf<ProductCategoryPublic, StatusMessage>> Find(ulong id)
    {
        var productCategory = await _context.ProductCategories
        .AsNoTracking()
        .FirstOrDefaultAsync(c => c.Id == id);
        return productCategory == null 
            ? _statusMessage.NotFound404<ProductCategory>(id) 
            : _mapper.Map<ProductCategory, ProductCategoryPublic>(productCategory);
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
    public async Task<OneOf<ProductCategoryPublic, StatusMessage>> Update(ulong productCategoryId, ProductCategoryRegister productCategoryRegister)
    {
        var productCategory = await _context.ProductCategories
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == productCategoryId);
        if (productCategory == null)
        {
            return _statusMessage.NotFound404<ProductCategory>(productCategoryId);
        }
        if (productCategoryRegister.Title != productCategory.Title)
        {
            var (result, notUniquePropertyNames) = await IsUnique(productCategoryRegister);
            if (!result)
            {
                return _statusMessage.NotUnique409<ProductCategory>(notUniquePropertyNames);
            }
        }
        productCategory = _mapper.Map<ProductCategoryRegister, ProductCategory>(productCategoryRegister);
        productCategory.Id = productCategoryId;
        _ = _context.Update(productCategory);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _mapper.Map<ProductCategory, ProductCategoryPublic>(productCategory);
    }
    public async Task<OneOf<ImagePublic, StatusMessage>> SaveImage(ulong productCategoryId, IFormFile image)
    {
        var productCategory = await _context.ProductCategories
            .FirstOrDefaultAsync(c => c.Id == productCategoryId);
        if (productCategory == null)
        {
            return _statusMessage.NotFound404<ProductCategory>(productCategoryId);
        }

        var imageSaveResult = await _imageService.SaveImage(image, productCategoryId, nameof(ProductCategory));
        if (imageSaveResult.IsT1)
        {
            return imageSaveResult.AsT1;
        }
        productCategory.ImagePath = imageSaveResult.AsT0;
        await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return new ImagePublic() { ImagePath = productCategory.ImagePath };
    }

    private async Task<(bool result, List<string> notUniquePropertyNames)> IsUnique(ProductCategoryRegister productCategoryWithoutId)
    {
        List<string> notUniquePropertyNames = new();
        var isUnique = !await _context.ProductCategories.AnyAsync(c => c.Title.ToLower() == productCategoryWithoutId.Title.ToLower());
        if (!isUnique)
        {
            notUniquePropertyNames.Add(nameof(productCategoryWithoutId.Title));
            return (false, notUniquePropertyNames);
        }
        return (true, notUniquePropertyNames);
    }

}
