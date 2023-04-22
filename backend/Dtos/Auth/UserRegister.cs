using backend.Dtos.Addresses;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Auth;

public class UserRegister
{
    [Required]
    [MinLength(3), MaxLength(25)]
    public required string Username { get; set; }
    [Required]
    [MinLength(3), MaxLength(25)]
    public required string FirstName { get; set; }
    [Required]
    [MinLength(3), MaxLength(25)]
    public required string LastName { get; set; }
    [Required]
    [EmailAddress]
    [MinLength(5), MaxLength(100)]
    public required string Email { get; set; }
    [Required]
    [MinLength(5), MaxLength(60)]
    public required string Password { get; set; }
    [Required]
    [MinLength(5), MaxLength(60)]
    public required string PasswordConfirm { get; set; }
    [Required]
    [Phone]
    [MinLength(3), MaxLength(20)]
    public required string Phone { get; set; }
    [Required]
    public required AddressPublic Address { get; set; }
}