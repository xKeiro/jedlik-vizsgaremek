using System.ComponentModel.DataAnnotations;

namespace backend.Models.Products
{
    public class ProductSupplier
    {
        [Required]
        public required Product Product { get; set; }
        [Required]
        public required Supplier Supplier { get; set; }
        [Required]
        public required decimal PurchasePrice { get; set; }
    }
}
