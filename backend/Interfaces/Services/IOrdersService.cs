using backend.Dtos.Orders;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IOrdersService
{
    IAsyncEnumerable<OrderPublic> GetAll();
    IAsyncEnumerable<OrderPublic> GetAllByUserId(ulong userId);
    Task<OneOf<OrderPublic, StatusMessage>> FindByOrderId(ulong orderId);
}
