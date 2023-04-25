using backend.Dtos.Supplires;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface ISupplierService
{
    IAsyncEnumerable<SupplierPublic> GetAll();
    Task<OneOf<SupplierPublic, StatusMessage>> Add(SupplierRegister supplierRegister);
}
