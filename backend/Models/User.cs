using backend.Models.Products;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User: BaseModel
    {
        [Required]
        [MinLength(3), MaxLength(25)]
        public required string Username { get; set; }
        [Required]
        [MinLength(3), MaxLength(25)]
        public required string FirstName { get; set; }
        [Required]
        [MinLength(3), MaxLength(25)]
        public required string LastName { get; set; }
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        [Required]
        [MinLength(60), MaxLength(60)]
        public required string Password { get; set; }
        [Required]
        [Phone]
        public required string Phone { get; set; }
        [Required]
        public required bool IsAdmin { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public required Address Address { get; set; }
        public IQueryable<ProductReview> ProductReviews { get; set; } = new List<ProductReview>().AsQueryable();
    }
}
