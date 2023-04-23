using backend.Dtos.Products;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IProductService
{
    IAsyncEnumerable<ProductPublic> GetNotDiscontinued();
    Task<OneOf<ProductPublic, StatusMessage>> Add(ProductRegister productWithoutId);
    IAsyncEnumerable<ProductPublic> GetNotDiscontinuedByCategoryId(ulong categoryId);
}
