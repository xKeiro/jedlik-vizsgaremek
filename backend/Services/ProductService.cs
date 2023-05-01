using AutoMapper;
using backend.Dtos.Images;
using backend.Dtos.Products;
using backend.Interfaces.Services;
using backend.Models;
using backend.Models.Products;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using OneOf;

namespace backend.Services;

public class ProductService : IProductService
{
    private readonly JedlikContext _context;
    private readonly IMapper _mapper;
    private readonly IStatusMessageService _statusMessage;
    private readonly IImageService _imageService;

    public ProductService(JedlikContext context, IMapper mapper, IStatusMessageService statusMessage, IJwtTokenGeneratorService jwtTokenGeneratorService, IImageService imageService)
    {
        _context = context;
        _mapper = mapper;
        _statusMessage = statusMessage;
        _imageService = imageService;
    }

    public async Task<ProductPublicWithPagination> GetNotDiscontinued(int page, int pageSize)
    {
        var maxPage = (int)Math.Ceiling(_context.Products.Where(p => !p.Discontinued).Count() / (decimal)pageSize);
        var nextPage = GetNextPage(page, maxPage);
        var productPublics = _context.Products
            .Include(p => p.Category)
            .Where(p => !p.Discontinued)
            .OrderByDescending(p => p.ProductOrders!.Count)
            .ThenByDescending(p => p.BasePrice * (1 - (p.Discount / 100)))
            .ThenBy(p => p.Title)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => _mapper.Map<Product, ProductPublic>(p))
            .ToListAsync();
        return new ProductPublicWithPagination()
        {
            NextPage = nextPage,
            Products = await productPublics
        };
    }
    public async Task<OneOf<ProductPublic, StatusMessage>> Add(ProductRegister productRegister)
    {
        var product = _mapper.Map<ProductRegister, Product>(productRegister);
        (var isUnique, var notUniquePropertyNames) = await IsUnique(product);
        if (!isUnique)
        {
            return _statusMessage.NotUnique409<Product>(notUniquePropertyNames);
        }
        var supplier = await _context.Suppliers
            .FirstOrDefaultAsync(s => s.Id == productRegister.SupplierId);
        if (supplier == null)
        {
            return _statusMessage.NotFound404<Supplier>(productRegister.SupplierId);
        }
        if (IsDiscontinuedAndFeaturedAtTheSameTime(product))
        {
            return _statusMessage.ProductCannotBeDiscontinuedAndFeaturedAtTheSameTime400();
        }
        var category = await _context.ProductCategories
            .FirstOrDefaultAsync(c => c.Id == productRegister.CategoryId);
        if (category == null)
        {
            return _statusMessage.NotFound404<ProductCategory>(productRegister.CategoryId);
        }
        product.Category = category;
        ProductSupplier productSupplier = new()
        {
            Product = product,
            PurchasePrice = productRegister.PurchasePrice,
            Supplier = supplier
        };
        _ = await _context.ProductSuppliers.AddAsync(productSupplier);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _mapper.Map<Product, ProductPublic>(product);
    }

    public async Task<ProductPublicWithPagination> GetNotDiscontinuedByCategoryId(ulong categoryId, int page, int pageSize)
    {
        var maxPage = (int)Math.Ceiling(
            _context.Products
            .Where(p => !p.Discontinued && p.Category.Id == categoryId)
            .Count() / (decimal)pageSize);
        var nextPage = GetNextPage(page, maxPage);
        var productsPublic = _context.Products 
            .Include(p => p.Category)
            .Where(p => !p.Discontinued && p.Category.Id == categoryId)
            .OrderByDescending(p => p.ProductOrders!.Count)
            .ThenByDescending(p => p.BasePrice * (1 - (p.Discount / 100)))
            .ThenBy(p => p.Title)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => _mapper.Map<Product, ProductPublic>(p))
            .ToListAsync();
        return new ProductPublicWithPagination() 
        {
            NextPage = nextPage,
            Products = await productsPublic
        };
    }

    public Task<List<ProductPublic>> GetFeatured()
        => _context.Products
            .Include(p => p.Category)
            .Where(p => p.Featured)
            .OrderByDescending(p => p.ProductOrders!.Count)
            .ThenByDescending(p => p.BasePrice * (1 - (p.Discount / 100)))
            .ThenBy(p => p.Title)
            .Select(p => _mapper.Map<Product, ProductPublic>(p))
            .ToListAsync();
    public Task<List<ProductPublic>> GetAll()
        => _context.Products
            .Include(p => p.Category)
            .OrderBy(p => p.Title)
            .Select(p => _mapper.Map<Product, ProductPublic>(p))
            .ToListAsync();
    public async Task<OneOf<ProductPublic, StatusMessage>> FindById(ulong productId)
    {
        var product = await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == productId);
        return product == null 
            ? _statusMessage.NotFound404<Product>(productId) 
            : _mapper.Map<Product, ProductPublic>(product);
    }
    public async Task<OneOf<ProductPublic, StatusMessage>> Update(ulong productId, ProductUpdate productUpdate)
    {
        var product = await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == productId);
        if (product == null)
        {
            return _statusMessage.NotFound404<Product>(productId);
        }
        if (productUpdate.Title != product.Title)
        {
            var productToCheck = _mapper.Map<ProductUpdate, Product>(productUpdate);
            (var isUnique, var notUniquePropertyNames) = await IsUnique(productToCheck);
            if (!isUnique)
            {
                return _statusMessage.NotUnique409<Product>(notUniquePropertyNames);
            }
        }
        var productToUpdate = _mapper.Map(productUpdate, product);
        if (IsDiscontinuedAndFeaturedAtTheSameTime(productToUpdate))
        {
            return _statusMessage.ProductCannotBeDiscontinuedAndFeaturedAtTheSameTime400();
        }
        var category = await _context.ProductCategories
            .FirstOrDefaultAsync(c => c.Id == productUpdate.CategoryId);
        if (category == null)
        {
            return _statusMessage.NotFound404<ProductCategory>(productUpdate.CategoryId);
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
            return _statusMessage.NotFound404<Product>(productId);
        }
        product.Discontinued = true;
        product.Featured = false;
        _ = _context.Products.Update(product);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _statusMessage.ProductDiscontinued200(productId);
    }
    public async Task<OneOf<ImagePublic, StatusMessage>> SaveImage(ulong productId, IFormFile image)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == productId);
        if (product == null)
        {
            return _statusMessage.NotFound404<Product>(productId);
        }
        var imageSaveResult = await _imageService.SaveImage(image, productId, nameof(Product));
        if (imageSaveResult.IsT1)
        {
            return imageSaveResult.AsT1;
        }
        product.ImagePath = imageSaveResult.AsT0;
        await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return new ImagePublic() { ImagePath = product.ImagePath };
    }

    private int? GetNextPage(int page, int maxPage)
    {
        int? nextPage = maxPage - page > 0
            ? page + 1
            : null;
        return nextPage;
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
