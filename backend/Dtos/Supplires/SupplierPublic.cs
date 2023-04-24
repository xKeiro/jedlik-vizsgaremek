using backend.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using backend.Dtos.Addresses;

namespace backend.Dtos.Supplires;

public class SupplierPublic: SupplierRegister
{
    public required ulong Id { get; set; }
}
