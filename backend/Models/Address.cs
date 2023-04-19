using backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Address : BaseModel
    {
        [MaxLength(50)]
        public required string Street { get; set; }
        [MaxLength(50)]
        public required string City { get; set; }
        [MaxLength(50)]
        public required string Region { get; set; }
        [MaxLength(10)]
        public required string PostalCode { get; set; }
        public required CountryCode Country { get; set; }
    }
}
