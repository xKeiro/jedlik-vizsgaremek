using AutoMapper;
using backend.Dtos.Products.ProductCategories;
using backend.Models.Products;

namespace backend.Maps;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        _ = CreateMap<ProductCategory, ProductCategoryPublic>();
        _ = CreateMap<ProductCategoryPublic, ProductCategory>();
        _ = CreateMap<ProductCategory, ProductCategoryWithoutId>();
        _ = CreateMap<ProductCategoryWithoutId, ProductCategory>();
    }
}
