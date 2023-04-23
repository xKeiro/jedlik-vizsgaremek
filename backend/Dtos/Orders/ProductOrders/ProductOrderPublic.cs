﻿using backend.Dtos.Products;
using backend.Models.Orders;
using backend.Models.Products;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Orders.ProductOrders;

public class ProductOrderPublic
{
    [Required]
    public required ProductPublic Product { get; set; }
    [Required]
    [Precision(18, 2)]
    public required decimal BasePrice { get; set; }
    [Required]
    public required uint Quantity { get; set; }
    [Required]
    public required byte Discount { get; set; }
    public decimal TotalPrice => BasePrice * Quantity * (Discount / 100);
}