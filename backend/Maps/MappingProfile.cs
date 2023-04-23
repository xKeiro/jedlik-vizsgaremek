using AutoMapper;
using backend.Dtos.Addresses;
using backend.Dtos.Auth;
using backend.Dtos.Orders;
using backend.Dtos.Orders.OrderAddresses;
using backend.Dtos.Orders.ProductOrders;
using backend.Dtos.Products;
using backend.Dtos.Products.ProductCategories;
using backend.Dtos.Users;
using backend.Models;
using backend.Models.Orders;
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

        _ = CreateMap<ProductRegister, Product>();
        _ = CreateMap<Product, ProductPublic>().ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.Category.Id));

        _ = CreateMap<OrderRegister, Order>();
        _ = CreateMap<Order, OrderPublic>();
        _ = CreateMap<ProductOrderPublic, ProductOrder>();
        _ = CreateMap<ProductOrder, ProductOrderPublic>();
        _ = CreateMap<OrderAddressPublic, OrderAddress>();
        _ = CreateMap<OrderAddress, OrderAddressPublic>();
    }
}
