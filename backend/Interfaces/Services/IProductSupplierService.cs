using backend.Dtos.Products.ProductSuppliers;
using backend.Dtos.Supplires;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IProductSupplierService
{
    IAsyncEnumerable<ProductSupplierLimited> GetAllForProduct(ulong productId);
    Task<OneOf<ProductSupplierLimited, StatusMessage>> Add(ulong productId, ProductSupplierRegister productSupplierRegister);
    Task<StatusMessage> Delete(ulong productId, ulong supplierId);
    Task<OneOf<ProductSupplierPublic, StatusMessage>> Update(ulong productId, ulong supplierId, ProductSupplierUpdate productSupplierUpdate);
}
