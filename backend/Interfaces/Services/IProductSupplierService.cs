using backend.Dtos.Products.ProductSuppliers;

namespace backend.Interfaces.Services;

public interface IProductSupplierService
{
    IAsyncEnumerable<ProductSupplierPublic> GetAll();
}
