using backend.Dtos.Products.ProductSuppliers;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IProductSupplierService
{
    IAsyncEnumerable<ProductSupplierPublic> GetAll();
    Task<OneOf<ProductSupplierLimited, StatusMessage>> Add(ulong productId, ProductSupplierRegister productSupplierRegister);
}
