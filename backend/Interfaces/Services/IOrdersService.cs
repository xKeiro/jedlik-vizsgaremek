using backend.Dtos.Orders;

namespace backend.Interfaces.Services;

public interface IOrdersService
{
    IAsyncEnumerable<OrderPublic> GetAll();
}
