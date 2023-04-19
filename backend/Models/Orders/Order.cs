using backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace backend.Models.Orders
{
    public class Order: BaseModel
    {
        [Required]
        public required User User { get; set; }
        [Required]
        public required Shipper Shipper { get; set; }
        [Required]
        [Range(0, 100)]
        public required byte Vat { get; set; }
        [Required]
        [EnumDataType(typeof(OrderStatus))]
        public required OrderStatus Status { get; set; }
        [Required]
        public required DateTime OrderDate { get; set; }
    }
}
