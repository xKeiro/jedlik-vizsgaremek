using backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Orders;

public class OrderAddress: BaseModel
{
    [Required]
    [MinLength(3), MaxLength(50)]
    public required string Street { get; set; }
    [Required]
    [MinLength(3), MaxLength(50)]
    public required string City { get; set; }
    [Required]
    [MinLength(3), MaxLength(50)]
    public required string Region { get; set; }
    [Required]
    [MaxLength(10)]
    public required string PostalCode { get; set; }
    [Required]
    public required CountryWithVat CountryWithVat { get; set; }
    public Order? Order { get; set; }
    public string Country => CountryWithVat.Country;
}
