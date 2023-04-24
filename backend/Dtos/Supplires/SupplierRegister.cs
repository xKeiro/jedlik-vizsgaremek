using backend.Dtos.Addresses;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Supplires;

public class SupplierRegister
{
    public required string CompanyName { get; set; }
    [Required]
    [MinLength(3), MaxLength(25)]
    public required string ContactFirstName { get; set; }
    [Required]
    [MinLength(3), MaxLength(25)]
    public required string ContactLastName { get; set; }
    [Required]
    [Phone]
    [MinLength(3), MaxLength(20)]
    public required string Phone { get; set; }
    [Required]
    [EmailAddress]
    [MinLength(5), MaxLength(100)]
    public required string Email { get; set; }
    [Required]
    [ForeignKey("AddressId")]
    public required AddressPublic Address { get; set; }
}
