using backend.Dtos.Products.ProductCategories;
using backend.Interfaces.Services.Bases;

namespace backend.Interfaces.Services;

public interface IProductCategoryService :
    IBasicCrudService<ProductCategoryPublic, ProductCategoryWithoutId>,
    IUniqueService<ProductCategoryPublic, ProductCategoryWithoutId>
{

}
