using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User: BaseModel
    {
        [MaxLength(25)]
        public required string Username { get; set; }
        [MaxLength(25)]
        public required string FirstName { get; set; }
        [MaxLength(25)]
        public required string LastName { get; set; }
        [EmailAddress]
        public required string Email { get; set; }
        [MinLength(60), MaxLength(60)]
        public required string Password { get; set; }
        [Phone]
        public required string Phone { get; set; }
        public required bool IsAdmin { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public required Address Address { get; set; }
    }
}
