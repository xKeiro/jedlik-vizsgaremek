using backend.Dtos.Images;
using backend.Dtos.Products;
using backend.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using OneOf;

namespace backend.Interfaces.Services;

public interface IProductService
{
    Task<ProductPublicWithPagination> GetNotDiscontinued(int page, int pageSize);
    Task<OneOf<ProductPublic, StatusMessage>> Add(ProductRegister productRegister);
    Task<ProductPublicWithPagination> GetNotDiscontinuedByCategoryId(ulong categoryId, int page, int pageSize);
    IAsyncEnumerable<ProductPublic> GetFeatured();
    IAsyncEnumerable<ProductPublic> GetAll();
    Task<OneOf<ProductPublic, StatusMessage>> FindById(ulong productId);
    Task<OneOf<ProductPublic, StatusMessage>> Update(ulong productId, ProductUpdate productUpdate);
    Task<StatusMessage> Discontinue(ulong productId);
    Task<OneOf<ImagePublic,StatusMessage>> SaveImage(ulong productId, IFormFile image);
}
