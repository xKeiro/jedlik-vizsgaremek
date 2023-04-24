namespace backend.Dtos.Shippers;

public class ShipperPublic : ShipperRegister
{
    public required ulong Id { get; set; }
    public required bool Disabled { get; set; }
}
