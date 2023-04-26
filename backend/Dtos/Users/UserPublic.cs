using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Users;

public class UserPublic
{
    public required ulong Id { get; set; }
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
    [Phone]
    [MinLength(3), MaxLength(20)]
    public required string Phone { get; set; }
    [Required]
    public required bool IsAdmin { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
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
    [MinLength(3), MaxLength(100)]
    public required string Country { get; set; }
    [MinLength(3), MaxLength(200)]
    public required string? ImagePath { get; set; }
}
