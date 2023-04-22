using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Auth;

public class UserLogin
{
    [Required]
    [MinLength(5), MaxLength(100)]
    public required string Identifier { get; set; }
    [Required]
    [MinLength(5), MaxLength(60)]
    public required string Password { get; set; }
}