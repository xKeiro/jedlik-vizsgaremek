using backend.Dtos.Shippers;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IShipperService
{
    IAsyncEnumerable<ShipperPublic> GetAll();
    Task<OneOf<ShipperPublic, StatusMessage>> Add(ShipperRegister shipperRegister);
    Task<OneOf<ShipperPublic, StatusMessage>> Find(ulong shipperId);
}
