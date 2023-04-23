using AutoMapper;
using backend.Dtos.Orders;
using backend.Interfaces.Services;
using backend.Models;
using backend.Models.Orders;
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

    public async IAsyncEnumerable<OrderPublic> GetAll()
    {
        await foreach (var order in _context.Orders.AsAsyncEnumerable())
        {
            yield return _mapper.Map<Order, OrderPublic>(order);
        }
    }
    public async IAsyncEnumerable<OrderPublic> GetAllByUserId(ulong userId)
    {
        await foreach (var order in _context.Orders.Where(order => order.User.Id == userId).AsAsyncEnumerable())
        {
            yield return _mapper.Map<Order, OrderPublic>(order);
        }
    }

}
