using AutoMapper;
using backend.Dtos.Orders;
using backend.Dtos.Orders.ProductOrders;
using backend.Enums;
using backend.Interfaces.Services;
using backend.Models;
using backend.Models.Orders;
using backend.Models.Products;
using Microsoft.EntityFrameworkCore;
using OneOf;

namespace backend.Services;

public class OrdersService: IOrdersService
{
    private readonly JedlikContext _context;
    private readonly IMapper _mapper;
    private readonly IStatusMessageService _statusMessage;

    public OrdersService(JedlikContext context, IMapper mapper, IStatusMessageService statusMessage, IJwtTokenGeneratorService jwtTokenGeneratorService)
    {
        _context = context;
        _mapper = mapper;
        _statusMessage = statusMessage;
    }

    public async IAsyncEnumerable<OrderAdmin> GetAll()
    {
        await foreach (var order in _context.Orders.AsAsyncEnumerable())
        {
            yield return _mapper.Map<Order, OrderAdmin>(order);
        }
    }
    public async IAsyncEnumerable<OrderPublic> GetAllByUserId(ulong userId)
    {
        await foreach (var order in _context.Orders.Where(order => order.User.Id == userId).AsAsyncEnumerable())
        {
            yield return _mapper.Map<Order, OrderPublic>(order);
        }
    }
    public async Task<OneOf<OrderPublic, StatusMessage>> FindMyOrder(ulong userId, ulong orderId)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(order => order.User.Id == userId && order.Id == orderId);
        if (order is null)
        {
            return _statusMessage.NotFound404<Order>(orderId);
        }
        return _mapper.Map<Order, OrderPublic>(order);
    }
    public async Task<OneOf<OrderAdmin, StatusMessage>> FindByOrderId(ulong orderId)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(order => order.Id == orderId);
        if (order is null)
        {
            return _statusMessage.NotFound404<Order>(orderId);
        }
        return _mapper.Map<Order, OrderAdmin>(order);
    }
    public async Task<OneOf<OrderAdmin, StatusMessage>> SetOrderStatus(ulong orderId, OrderStatus status)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(order => order.Id == orderId);
        if (order is null)
        {
            return _statusMessage.NotFound404<Order>(orderId);
        }
        order.Status = status;
        await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _mapper.Map<Order, OrderAdmin>(order);
    }
    public async Task<OneOf<OrderPublic, StatusMessage>> Add(ulong userId, OrderRegister orderRegister)
    {
        var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == userId);
        if (user is null)
        {
            return _statusMessage.NotFound404<User>(userId);
        }
        var shipper = await _context.Shippers.FirstOrDefaultAsync(shipper => shipper.Id == orderRegister.ShipperId);
        if (shipper is null)
        {
            return _statusMessage.NotFound404<Shipper>(orderRegister.ShipperId);
        }
        var productOrders = new List<ProductOrder>();
        var order = new Order
        {
            Street = user.Street,
            City = user.City,
            Region = user.Region,
            PostalCode = user.PostalCode,
            CountryWithVat = user.CountryWithVat,
            User = user,
            ShippingPrice = shipper.Price,
            ShipperName = shipper.CompanyName,
        };
        foreach (var productOrderRegister in orderRegister.ProductOrders)
        {
            var product = await _context.Products.FirstOrDefaultAsync(product => product.Id == productOrderRegister.ProductId);
            if (product is null)
            {
                return _statusMessage.NotFound404<Product>(productOrderRegister.ProductId);
            }

            var discount = product.Discount;
            var costPrice = _context.ProductSuppliers.Where(ps => ps.Product.Id == product.Id).Min(ps => ps.PurchasePrice);
            ProductOrder productOrder = new()
            {
                Product = product,
                Quantity = productOrderRegister.Quantity,
                Discount = discount,
                CostPrice = costPrice,
                BasePrice = product.BasePrice,
                Order = order,
            };
            productOrders.Add(productOrder);
        }
        order.ProductOrders = productOrders;
        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _mapper.Map<Order, OrderPublic>(order);
    }

}
