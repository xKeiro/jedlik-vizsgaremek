using AutoMapper;
using backend.Dtos.Shippers;
using backend.Interfaces.Services;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class ShipperService: IShipperService
{
    private readonly JedlikContext _context;
    private readonly IMapper _mapper;
    private readonly IStatusMessageService _statusMessage;
    public ShipperService(JedlikContext context, IMapper mapper, IStatusMessageService statusMessage)
    {
        _context = context;
        _mapper = mapper;
        _statusMessage = statusMessage;
    }
    public async IAsyncEnumerable<ShipperPublic> GetAll()
    {
        var shippers = _context.Shippers
            .OrderBy(s => s.Price)
            .ThenBy(s => s.CompanyName)
            .AsAsyncEnumerable();
        await foreach (var shipper in shippers)
        {
            yield return _mapper.Map<Shipper, ShipperPublic>(shipper);
        }
    }
}
