using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Products.ProductSuppliers;

public class ProductSupplierUpdate
{
    [Required]
    [Precision(18, 2)]
    public required decimal PurchasePrice { get; set; }
}
