using backend.Dtos.Products;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IProductService
{
    IAsyncEnumerable<ProductPublic> GetNotDiscontinued();
}
