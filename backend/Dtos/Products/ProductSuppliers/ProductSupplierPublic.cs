using backend.Models.Products;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using backend.Dtos.Supplires;

namespace backend.Dtos.Products.ProductSuppliers;

public class ProductSupplierPublic
{
    [Required]
    public required SupplierPublic Supplier { get; set; }
    [Required]
    [Precision(18, 2)]
    public required decimal PurchasePrice { get; set; }
    [Required]
    public required Product Product { get; set; }
}
