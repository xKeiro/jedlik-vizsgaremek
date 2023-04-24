using AutoMapper;
using backend.Dtos.Addresses;
using backend.Dtos.Auth;
using backend.Dtos.Orders;
using backend.Dtos.Orders.OrderAddresses;
using backend.Dtos.Orders.ProductOrders;
using backend.Dtos.Products;
using backend.Dtos.Products.ProductCategories;
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
        _ = CreateMap<ProductCategory, ProductCategoryWithoutId>();
        _ = CreateMap<ProductCategoryWithoutId, ProductCategory>();

        _ = CreateMap<UserRegister, User>();
        _ = CreateMap<User, UserPublic>();
        _ = CreateMap<User, UserPublicLimited>();

        _ = CreateMap<AddressPublic, Address>();
        _ = CreateMap<Address, AddressPublic>();
        _ = CreateMap<Address, OrderAddress>().ForMember(oa => oa.Id, opt => opt.Ignore());

        _ = CreateMap<ProductRegister, Product>();
        _ = CreateMap<Product, ProductPublic>().ForMember(pb => pb.CategoryId, opt => opt.MapFrom(p => p.Category.Id));
        _ = CreateMap<Product, ProductPublicLimited>();

        _ = CreateMap<OrderRegister, Order>();
        _ = CreateMap<Order, OrderPublic>().ForMember(op => op.ShipperId, opt => opt.MapFrom(o => o.Shipper.Id));
        _ = CreateMap<ProductOrderPublic, ProductOrder>();
        _ = CreateMap<ProductOrder, ProductOrderPublic>();
        _ = CreateMap<ProductOrder, ProductOrderAdmin>();
        _ = CreateMap<OrderAddressPublic, OrderAddress>();
        _ = CreateMap<OrderAddress, OrderAddressPublic>();
        _ = CreateMap<Order, OrderAdmin>();

        _ = CreateMap<ShipperRegister, Shipper>();
        _ = CreateMap<Shipper, ShipperPublic>();

        _ = CreateMap<SupplierRegister, Supplier>();
        _ = CreateMap<Supplier, SupplierPublic>();

        _ = CreateMap<ProductSupplierPublic,  ProductSupplier>();
        _ = CreateMap<ProductSupplier,  ProductSupplierPublic>();
    }
}
