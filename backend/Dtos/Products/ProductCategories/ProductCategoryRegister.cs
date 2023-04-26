using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Products.ProductCategories;

public class ProductCategoryRegister
{
    [Required]
    [MinLength(3), MaxLength(150)]
    public required string Title { get; set; }
    [Required]
    [MinLength(3), MaxLength(2000)]
    public required string Description { get; set; }
}
