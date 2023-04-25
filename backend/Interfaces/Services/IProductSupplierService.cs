using backend.Dtos.Products.ProductSuppliers;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IProductSupplierService
{
    IAsyncEnumerable<ProductSupplierLimited> GetAllForProduct(ulong productId);
    Task<OneOf<ProductSupplierLimited, StatusMessage>> Add(ulong productId, ProductSupplierRegister productSupplierRegister);
}
