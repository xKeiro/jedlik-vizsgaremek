using AutoMapper;
using backend.Dtos.Auth;
using backend.Dtos.Orders;
using backend.Dtos.Orders.ProductOrders;
using backend.Dtos.Products;
using backend.Dtos.Products.ProductCategories;
using backend.Dtos.Products.ProductReviews;
using backend.Dtos.Products.ProductSuppliers;
using backend.Dtos.Shippers;
using backend.Dtos.Supplires;
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
        _ = CreateMap<ProductCategory, ProductCategoryRegister>();
        _ = CreateMap<ProductCategoryRegister, ProductCategory>();

        _ = CreateMap<UserRegister, User>();
        _ = CreateMap<UserUpdate, User>();
        _ = CreateMap<User, UserPublic>();
        _ = CreateMap<User, UserPublicLimited>();

        _ = CreateMap<ProductRegister, Product>();
        _ = CreateMap<Product, ProductPublic>().ForMember(pb => pb.CategoryId, opt => opt.MapFrom(p => p.Category.Id));
        _ = CreateMap<Product, ProductPublicLimited>();

        _ = CreateMap<ProductReviewRegister, ProductReview>();
        _ = CreateMap<ProductReview, ProductReviewPublic>();

        _ = CreateMap<OrderRegister, Order>();
        _ = CreateMap<Order, OrderPublic>();
        _ = CreateMap<ProductOrderPublic, ProductOrder>();
        _ = CreateMap<ProductOrder, ProductOrderPublic>();
        _ = CreateMap<ProductOrder, ProductOrderAdmin>();
        _ = CreateMap<Order, OrderAdmin>();

        _ = CreateMap<ShipperRegister, Shipper>();
        _ = CreateMap<Shipper, ShipperPublic>();

        _ = CreateMap<SupplierRegister, Supplier>();
        _ = CreateMap<Supplier, SupplierPublic>();

        _ = CreateMap<ProductSupplierPublic,  ProductSupplier>();
        _ = CreateMap<ProductSupplier,  ProductSupplierPublic>();
        _ = CreateMap<ProductSupplier,  ProductSupplierLimited>();
    }
}
