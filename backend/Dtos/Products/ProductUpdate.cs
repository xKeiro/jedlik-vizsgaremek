﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Products;
public class ProductUpdate
{
    [Required]
    public required ulong CategoryId { get; set; }
    [Required]
    [Precision(18, 2)]
    public required decimal BasePrice { get; set; }
    [MinLength(3), MaxLength(150)]
    public required string Title { get; set; }
    [MinLength(3), MaxLength(4000)]
    public required string Description { get; set; }
    [Required]
    public required uint Stock { get; set; }
    [Required]
    [Range(0, 100)]
    public required byte Discount { get; set; }
    [Required]
    public required bool Discontinued { get; set; }
    [Required]
    public required bool Featured { get; set; }
}
