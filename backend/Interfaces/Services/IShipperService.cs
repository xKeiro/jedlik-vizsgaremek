using backend.Dtos.Shippers;

namespace backend.Interfaces.Services;

public interface IShipperService
{
    IAsyncEnumerable<ShipperPublic> GetAll();
}
