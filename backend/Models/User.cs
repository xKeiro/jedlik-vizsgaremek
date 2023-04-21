using backend.Models.Orders;
using backend.Models.Products;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Index(nameof(Username), IsUnique = true)]
[Index(nameof(Email), IsUnique = true)]
public class User : BaseModel
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
    [MinLength(60), MaxLength(60)]
    public required string Password { get; set; }
    [Required]
    [Phone]
    [MinLength(3), MaxLength(20)]
    public required string Phone { get; set; }
    [Required]
    public required bool IsAdmin { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    [Required]
    [ForeignKey("AddressId")]
    public required Address Address { get; set; }
    public ICollection<ProductReview>? ProductReviews { get; set; }
    public ICollection<ProductOrder>? ProductOrders { get; set; }
}
