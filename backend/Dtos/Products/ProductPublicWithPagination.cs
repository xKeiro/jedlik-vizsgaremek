using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Products;

public class ProductPublicWithPagination
{
    public int? NextPage { get; set; }
    [Required]
    public required ICollection<ProductPublic> Products { get; set; }

}
