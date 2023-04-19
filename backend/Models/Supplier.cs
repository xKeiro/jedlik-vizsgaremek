﻿using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Supplier: BaseModel
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
        public required string Phone { get; set; }
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        [Required]
        public required Address Address { get; set; }
    }
}
