using backend.Dtos.Products;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IProductService
{
    IAsyncEnumerable<ProductPublic> GetNotDiscontinued();
    Task<OneOf<ProductPublic, StatusMessage>> Add(ProductRegister productRegister);
    IAsyncEnumerable<ProductPublic> GetNotDiscontinuedByCategoryId(ulong categoryId);
    IAsyncEnumerable<ProductPublic> GetFeatured();
    IAsyncEnumerable<ProductPublic> GetAll();
}
