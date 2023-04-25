using backend.Dtos.Supplires;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Products.ProductSuppliers;

public class ProductSupplierLimited
{
    [Required]
    public required SupplierPublic Supplier { get; set; }
    [Required]
    [Precision(18, 2)]
    public required decimal PurchasePrice { get; set; }
}
