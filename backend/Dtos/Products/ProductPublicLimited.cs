using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Products;

public class ProductPublicLimited
{
    public ulong Id { get; set; }
    [Required]
    public required string Title { get; set; }
}
