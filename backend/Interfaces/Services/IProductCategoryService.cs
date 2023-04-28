using backend.Dtos.Images;
using backend.Dtos.Products.ProductCategories;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IProductCategoryService
{
    Task<List<ProductCategoryPublic>> GetAll();
    Task<OneOf<ProductCategoryPublic, StatusMessage>> Add(ProductCategoryRegister productCategoryRegister);
    Task<OneOf<ProductCategoryPublic, StatusMessage>> Find(ulong id);
    Task<OneOf<ProductCategoryPublic, StatusMessage>> Update(ulong productCategoryId, ProductCategoryRegister productCategoryRegister);
    Task<OneOf<ImagePublic, StatusMessage>> SaveImage(ulong productCategoryId, IFormFile image);
}
