using AutoMapper;
using backend.Dtos.Products.ProductSuppliers;
using backend.Interfaces.Services;
using backend.Models;
using backend.Models.Products;
using Microsoft.EntityFrameworkCore;
using OneOf;

namespace backend.Services;

public class ProductSupplierService: IProductSupplierService
{
    private readonly JedlikContext _context;
    private readonly IMapper _mapper;
    private readonly IStatusMessageService _statusMessage;
    public ProductSupplierService(JedlikContext context, IMapper mapper, IStatusMessageService statusMessage)
    {
        _context = context;
        _mapper = mapper;
        _statusMessage = statusMessage;
    }
    public async IAsyncEnumerable<ProductSupplierPublic> GetAll()
    {
        var productSuppliers = _context.ProductSuppliers
            .Include(ps => ps.Product)
            .OrderBy(ps => ps.Product.Title)
            .ThenBy(ps => ps.PurchasePrice)
            .AsAsyncEnumerable();
        await foreach (var productSupplier in productSuppliers)
        {
            yield return _mapper.Map<ProductSupplier, ProductSupplierPublic>(productSupplier);
        }
    }
    public async Task<OneOf<ProductSupplierLimited, StatusMessage>> Add(ulong productId, ProductSupplierRegister productSupplierRegister)
    {
        var isUnique = !await _context.ProductSuppliers
            .AnyAsync(ps => ps.Product.Id == productId && ps.Supplier.Id == productSupplierRegister.SupplierId);
        if (!isUnique)
        {
            return _statusMessage.ProductAlreadyHaveThisSupplierRegistered409(productId, productSupplierRegister.SupplierId);
        }
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == productId);
        if (product == null)
        {
            return _statusMessage.NotFound404<Product>(productId);
        }
        var supplier = await _context.Suppliers
            .FirstOrDefaultAsync(s => s.Id == productSupplierRegister.SupplierId);
        if (supplier == null)
        {
            return _statusMessage.NotFound404<Supplier>(productSupplierRegister.SupplierId);
        }
        ProductSupplier productSupplier = new()
        {
            PurchasePrice = productSupplierRegister.PurchasePrice,
            Product = product,
            Supplier = supplier
        }; 
        _context.ProductSuppliers.Add(productSupplier);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _mapper.Map<ProductSupplier, ProductSupplierLimited>(productSupplier);
    }

}
