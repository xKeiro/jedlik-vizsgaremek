using System.ComponentModel.DataAnnotations;

namespace backend.Models.Products;

public class ProductReview : BaseModel
{
    [Required]
    public required Product Product { get; set; }
    [Required]
    [Range(1, 5)]
    public required byte Score { get; set; }
    [Required]
    [MinLength(3), MaxLength(3000)]
    public required string Text { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    [Required]
    public User User { get; set; } = null!;
}
