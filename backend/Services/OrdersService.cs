using AutoMapper;
using backend.Dtos.Orders;
using backend.Dtos.Users;
using backend.Interfaces.Services;
using backend.Models;
using backend.Models.Orders;

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

    public async IAsyncEnumerable<OrderPublic> GetAll()
    {
        await foreach (var order in _context.Orders.AsAsyncEnumerable())
        {
            yield return _mapper.Map<Order, OrderPublic>(order);
        }
    }

}
