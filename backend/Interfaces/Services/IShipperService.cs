using backend.Dtos.Shippers;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IShipperService
{
    IAsyncEnumerable<ShipperPublic> GetAll();
    Task<OneOf<ShipperPublic, StatusMessage>> Add(ShipperRegister shipperRegister);
    Task<OneOf<ShipperPublic, StatusMessage>> Find(ulong shipperId);
    Task<OneOf<ShipperPublic, StatusMessage>> Update(ulong shipperId, ShipperRegister shipperRegister);
    Task<StatusMessage> Delete(ulong shipperId);
}
