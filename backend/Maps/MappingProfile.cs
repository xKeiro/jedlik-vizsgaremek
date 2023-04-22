using AutoMapper;
using backend.Dtos.Addresses;
using backend.Dtos.Auth;
using backend.Dtos.Products.ProductCategories;
using backend.Dtos.Users;
using backend.Models;
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

        _ = CreateMap<UserRegister, User>();
        _ = CreateMap<User, UserPublic>();

        _ = CreateMap<AddressPublic, Address>();
        _ = CreateMap<Address, AddressPublic>();
    }
}
