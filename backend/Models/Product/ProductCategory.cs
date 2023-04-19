using System.ComponentModel.DataAnnotations;

namespace backend.Models.Product
{
    public class ProductCategory: BaseModel
    {
        [MinLength(3), MaxLength(150)]
        public required string Title { get; set; }
        [MinLength(3)]
        public required string Description { get; set; }
    }
}
