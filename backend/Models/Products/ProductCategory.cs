using System.ComponentModel.DataAnnotations;

namespace backend.Models.Products;

public class ProductCategory: BaseModel
{
    [Required]
    [MinLength(3), MaxLength(150)]
    public required string Title { get; set; }
    [Required]
    [MinLength(3), MaxLength(2000)]
    public required string Description { get; set; }
}
