using backend.Models.Orders;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

[Index(nameof(Country), IsUnique = true)]
public class CountryWithVat: BaseModel
{
    [Required]
    [MinLength(3), MaxLength(100)]
    public required string Country { get; set; }

    [Required]
    [Range(0, 100)]
    public required byte Vat { get; set; }
    public ICollection<Address>? Addresses { get; set; }
    public ICollection<OrderAddress>? OrderAddress { get; set; }
}
