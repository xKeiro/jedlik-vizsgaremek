using AutoMapper;
using backend.Dtos.Products.ProductSuppliers;
using backend.Interfaces.Services;
using backend.Models.Products;
using Microsoft.EntityFrameworkCore;

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
}
