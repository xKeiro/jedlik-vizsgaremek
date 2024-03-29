﻿using AutoMapper;
using backend.Dtos.Auth;
using backend.Dtos.Supplires;
using backend.Interfaces.Services;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using OneOf;

namespace backend.Services;

public class SupplierService: ISupplierService
{
    private readonly JedlikContext _context;
    private readonly IMapper _mapper;
    private readonly IStatusMessageService _statusMessage;
    public SupplierService(JedlikContext context, IMapper mapper, IStatusMessageService statusMessage)
    {
        _context = context;
        _mapper = mapper;
        _statusMessage = statusMessage;
    }
    public async Task<List<SupplierPublic>> GetAll() => await _context.Suppliers
        .OrderBy(s => s.CompanyName)
        .Select(s => _mapper.Map<Supplier, SupplierPublic>(s))
        .ToListAsync();
    public async Task<OneOf<SupplierPublic, StatusMessage>> Add(SupplierRegister supplierRegister)
    {
        var isUnique = !await _context.Suppliers
            .AnyAsync(s => s.CompanyName.ToLower() == supplierRegister.CompanyName.ToLower());
        if (!isUnique)
        {
            return _statusMessage.NotUnique409<Supplier>(new List<string>() { nameof(supplierRegister.CompanyName) });
        }
        var countryWithVat = await _context.CountriesWithVat
            .FirstOrDefaultAsync(cwv => cwv.Country.ToLower() == supplierRegister.Country.ToLower());
        if (countryWithVat == null)
        {
            return _statusMessage.DoesNotExist404(nameof(supplierRegister.Country), supplierRegister.Country);
        }
        var supplier = _mapper.Map<SupplierRegister, Supplier>(supplierRegister);
        supplier.CountryWithVat = countryWithVat;
        _context.Suppliers.Add(supplier);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _mapper.Map<Supplier, SupplierPublic>(supplier);
    }
    public async Task<OneOf<SupplierPublic, StatusMessage>> Find(ulong supplierId)
    {
        var supplier = await _context.Suppliers
            .FirstOrDefaultAsync(s => s.Id == supplierId);
        if (supplier == null)
        {
            return _statusMessage.NotFound404<Supplier>(supplierId);
        }
        return _mapper.Map<Supplier, SupplierPublic>(supplier);
    }
    public async Task<OneOf<SupplierPublic, StatusMessage>> Update(ulong supplierId, SupplierRegister supplierRegister)
    {
        var supplier = await _context.Suppliers
            .FirstOrDefaultAsync(s => s.Id == supplierId);
        if (supplier == null)
        {
            return _statusMessage.NotFound404<Supplier>(supplierId);
        }
        var isUnique = !await _context.Suppliers
            .AnyAsync(s => s.CompanyName.ToLower() == supplierRegister.CompanyName.ToLower() && s.Id != supplierId);
        if (!isUnique)
        {
            return _statusMessage.NotUnique409<Supplier>(new List<string>() { nameof(supplierRegister.CompanyName) });
        }
        var countryWithVat = await _context.CountriesWithVat
            .FirstOrDefaultAsync(cwv => cwv.Country.ToLower() == supplierRegister.Country.ToLower());
        if (countryWithVat == null)
        {
            return _statusMessage.DoesNotExist404(nameof(supplierRegister.Country), supplierRegister.Country);
        }
        _mapper.Map(supplierRegister, supplier);
        supplier.CountryWithVat = countryWithVat;
        _context.Suppliers.Update(supplier);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _mapper.Map<Supplier, SupplierPublic>(supplier);
    }
    public async Task<StatusMessage> Delete(ulong supplierId)
    {
        var supplier = await _context.Suppliers
            .FirstOrDefaultAsync(s => s.Id == supplierId);
        if (supplier == null)
        {
            return _statusMessage.NotFound404<Supplier>(supplierId);
        }
        _context.Suppliers.Remove(supplier);
        _ = await _context.SaveChangesAsync();
        _context.ChangeTracker.Clear();
        return _statusMessage.Deleted200<Supplier>(supplierId);
    }
}
