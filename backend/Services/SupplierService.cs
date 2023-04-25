using AutoMapper;
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
    public async IAsyncEnumerable<SupplierPublic> GetAll()
    {
        var suppliers = _context.Suppliers
            .OrderBy(s => s.CompanyName)
            .AsAsyncEnumerable();
        await foreach (var supplier in suppliers)
        {
            yield return _mapper.Map<Supplier, SupplierPublic>(supplier);
        }
    }
    public async Task<OneOf<SupplierPublic, StatusMessage>> Add(SupplierRegister supplierRegister)
    {
        var isUnique = !await _context.Suppliers
            .AnyAsync(s => s.CompanyName.ToLower() == supplierRegister.CompanyName.ToLower());
        if (!isUnique)
        {
            return _statusMessage.NotUnique409<Supplier>(new List<string>() { nameof(supplierRegister.CompanyName) });
        }
        var countryWithVat = await _context.CountriesWithVat
            .FirstOrDefaultAsync(cwv => cwv.Country.ToLower() == supplierRegister.Address.Country.ToLower());
        if (countryWithVat == null)
        {
            return _statusMessage.DoesNotExist404(nameof(supplierRegister.Address.Country), supplierRegister.Address.Country);
        }
        var supplier = _mapper.Map<SupplierRegister, Supplier>(supplierRegister);
        supplier.Address.CountryWithVat = countryWithVat;
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
}
