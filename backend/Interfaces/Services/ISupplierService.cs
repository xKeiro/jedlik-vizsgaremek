using backend.Dtos.Supplires;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface ISupplierService
{
    Task<List<SupplierPublic>> GetAll();
    Task<OneOf<SupplierPublic, StatusMessage>> Add(SupplierRegister supplierRegister);
    Task<OneOf<SupplierPublic, StatusMessage>> Find(ulong supplierId);
    Task<OneOf<SupplierPublic, StatusMessage>> Update(ulong supplierId, SupplierRegister supplierRegister);
    Task<StatusMessage> Delete(ulong supplierId);
}
