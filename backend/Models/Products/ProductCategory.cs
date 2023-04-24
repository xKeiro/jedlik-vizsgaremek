using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Products;

[Index(nameof(Title), IsUnique = true)]
public class ProductCategory : BaseModel
{
    [Required]
    [MinLength(3), MaxLength(150)]
    public required string Title { get; set; }
    [Required]
    [MinLength(3), MaxLength(2000)]
    public required string Description { get; set; }
    public ICollection<Product>? Products { get; set; }
}
