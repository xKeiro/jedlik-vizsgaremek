using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Products.ProductCategories;

public class ProductCategoryPublic
{
    public required ulong Id { get; set; }
    [Required]
    [MinLength(3), MaxLength(150)]
    public required string Title { get; set; }
    [Required]
    [MinLength(3), MaxLength(2000)]
    public required string Description { get; set; }
    [Required]
    [MinLength(3), MaxLength(200)]
    public required string ImagePath { get; set; }
}
