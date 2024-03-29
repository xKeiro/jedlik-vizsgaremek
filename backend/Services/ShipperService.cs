﻿using AutoMapper;
using backend.Dtos.Shippers;
using backend.Interfaces.Services;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using OneOf;

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
    public async Task<List<ShipperPublic>> GetAll() 
        => await _context.Shippers
        .OrderBy(s => s.Price)
        .ThenBy(s => s.CompanyName)
        .Select(s => _mapper.Map<Shipper, ShipperPublic>(s))
        .ToListAsync();
    public async Task<OneOf<ShipperPublic, StatusMessage>> Add(ShipperRegister shipperRegister)
    {
        var isUnique = !await _context.Shippers
            .AnyAsync(s => s.CompanyName.ToLower() == shipperRegister.CompanyName.ToLower());
        if (!isUnique)
        {
            return _statusMessage.NotUnique409<Shipper>(new List<string>() { nameof(shipperRegister.CompanyName) });
        }
        var shipper = _mapper.Map<ShipperRegister, Shipper>(shipperRegister);
        _context.Shippers.Add(shipper);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _mapper.Map<Shipper, ShipperPublic>(shipper);
    }
    public async Task<OneOf<ShipperPublic, StatusMessage>> Find(ulong shipperId)
    {
        var shipper = await _context.Shippers
            .FirstOrDefaultAsync(s => s.Id == shipperId);
        if (shipper == null)
        {
            return _statusMessage.NotFound404<Shipper>(shipperId);
        }
        return _mapper.Map<Shipper, ShipperPublic>(shipper);
    }
    public async Task<OneOf<ShipperPublic, StatusMessage>> Update(ulong shipperId, ShipperRegister shipperRegister)
    {
        var shipper = await _context.Shippers
            .FirstOrDefaultAsync(s => s.Id == shipperId);
        if (shipper == null)
        {
            return _statusMessage.NotFound404<Shipper>(shipperId);
        }
        var isUnique = !await _context.Shippers
            .AnyAsync(s => s.CompanyName.ToLower() == shipperRegister.CompanyName.ToLower() && s.Id != shipperId);
        if (!isUnique)
        {
            return _statusMessage.NotUnique409<Shipper>(new List<string>() { nameof(shipperRegister.CompanyName) });
        }
        _mapper.Map(shipperRegister, shipper);
        _context.Shippers.Update(shipper);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _mapper.Map<Shipper, ShipperPublic>(shipper);
    }
    public async Task<StatusMessage> Delete(ulong shipperId)
    {
        var shipper = await _context.Shippers
            .FirstOrDefaultAsync(s => s.Id == shipperId);
        if (shipper == null)
        {
            return _statusMessage.NotFound404<Shipper>(shipperId);
        }
        _context.Shippers.Remove(shipper);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _statusMessage.Deleted200<Shipper>(shipperId);
    }
}
