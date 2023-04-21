﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Index(nameof(CompanyName), IsUnique = true)]
public class Supplier : BaseModel
{
    [Required]
    [MinLength(3), MaxLength(75)]
    public required string CompanyName { get; set; }
    [Required]
    [MinLength(3), MaxLength(25)]
    public required string ContactFirstName { get; set; }
    [Required]
    [MinLength(3), MaxLength(25)]
    public required string ContactLastName { get; set; }
    [Required]
    [Phone]
    [MinLength(3), MaxLength(20)]
    public required string Phone { get; set; }
    [Required]
    [EmailAddress]
    [MinLength(5), MaxLength(100)]
    public required string Email { get; set; }
    [Required]
    [ForeignKey("AddressId")]
    public required Address Address { get; set; }
    public bool Disabled { get; set; } = false;
}
