using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Products.ProductSuppliers;

public class ProductSupplierRegister
{
    [Required]
    public required ulong SupplierId { get; set; }
    [Required]
    [Precision(18, 2)]
    public required decimal PurchasePrice { get; set; }
}
