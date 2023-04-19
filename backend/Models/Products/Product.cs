using System.ComponentModel.DataAnnotations;

namespace backend.Models.Products
{
    public class Product: BaseModel
    {
        /*
         category_id = Column(UUID(as_uuid=True), ForeignKey('product_category.id'), nullable=False)
    base_price = Column(Numeric(12, 2), nullable=False)
    title = Column(String(150), nullable=False)
    description = Column(String, nullable=False)
    photo = Column(String(250), nullable=True)
    stock = Column(Integer, nullable=False, server_default="0")
    discount = Column(Numeric(2, 2), nullable=False, server_default="0")
    discontinued = Column(Boolean, server_default="False", nullable=False)
    featured = Column(Boolean, server_default="False", nullable=False)
    product_category = relationship('ProductCategory')
         */
        [Required]
        public required ProductCategory Category { get; set; }
        [Required]
        public required decimal BasePrice { get; set; }
        [MinLength(3), MaxLength(150)]
        public required string Title { get; set; }
        [MinLength(3)]
        public required string Description { get; set; }
        [Required]
        public required uint Stock { get; set; }
        [Required]
        public required decimal Discount { get; set; }
        [Required]
        public required bool Discontinued { get; set; }
        [Required]
        public required bool Featured { get; set; }
        [Required]
        public required Supplier Supplier { get; set; }
    }
}
