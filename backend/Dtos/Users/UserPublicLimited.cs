using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Users;

public class UserPublicLimited
{
    public required ulong Id { get; set; }
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
    [Phone]
    [MinLength(3), MaxLength(20)]
    public required string Phone { get; set; }
    [MinLength(3), MaxLength(200)]
    public required string? ImagePath { get; set; }
}
