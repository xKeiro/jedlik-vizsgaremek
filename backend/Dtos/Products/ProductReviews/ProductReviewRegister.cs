using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Products.ProductReviews;

public class ProductReviewRegister
{
    [Required]
    public required ulong ProductId { get; set; }
    [Required]
    [Range(1, 5)]
    public required byte Score { get; set; }
    [Required]
    [MinLength(3), MaxLength(3000)]
    public required string Text { get; set; }
}
