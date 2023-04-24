using backend.Dtos.Orders;
using backend.Enums;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IOrdersService
{
    IAsyncEnumerable<OrderAdmin> GetAll();
    IAsyncEnumerable<OrderPublic> GetAllByUserId(ulong userId);
    Task<OneOf<OrderPublic, StatusMessage>> FindMyOrder(ulong userId, ulong orderId);
    Task<OneOf<OrderAdmin, StatusMessage>> FindByOrderId(ulong orderId);
    Task<OneOf<OrderAdmin, StatusMessage>> SetOrderStatus(ulong orderId, OrderStatus status);
    Task<OneOf<OrderPublic, StatusMessage>> Add(ulong userId, OrderRegister orderRegister);
}
