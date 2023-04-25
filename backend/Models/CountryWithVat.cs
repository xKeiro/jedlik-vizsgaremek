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
    public ICollection<Supplier>? Suppliers{ get; set; }
    public ICollection<User>? Users { get; set; }
    public ICollection<Order>? Orders { get; set; }
}
