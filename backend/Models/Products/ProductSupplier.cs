﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Products;

[Index("SupplierId", "ProductId", IsUnique = true)]
public class ProductSupplier : BaseModel
{
    [Required]
    public required Supplier Supplier { get; set; }
    [Required]
    [Precision(18, 2)]
    public required decimal PurchasePrice { get; set; }
    [Required]
    public required Product Product { get; set; }
}
