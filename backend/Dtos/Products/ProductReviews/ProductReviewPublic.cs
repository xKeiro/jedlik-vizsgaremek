using backend.Dtos.Users;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Products.ProductReviews;

public class ProductReviewPublic
{
    [Required]
    public required ProductPublicLimited Product { get; set; }
    [Required]
    [Range(1, 5)]
    public required byte Score { get; set; }
    [Required]
    [MinLength(3), MaxLength(3000)]
    public required string Text { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    [Required]
    public required UserPublicLimited User { get; set; }
}
