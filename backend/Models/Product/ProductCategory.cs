using System.ComponentModel.DataAnnotations;

namespace backend.Models.Product
{
    public class ProductCategory: BaseModel
    {
        [MaxLength(150)]
        public required string Title { get; set; }
        public required string Description { get; set; }
    }
}
