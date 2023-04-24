using backend.Models.Products;
using backend.Services;
using System.ComponentModel.DataAnnotations;

namespace backend.DataAnnotations;

public class NonDiscontinuedProductMustHaveSupplierAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
    {
        var dbContext = (JedlikContext)validationContext.GetService(typeof(JedlikContext))!;
        var product = (Product)value!;

        if (!product.Discontinued && !dbContext.ProductSuppliers.Any(ps => ps.Product.Id == product.Id))
        {
            return new ValidationResult("Non-discontinued products must have at least one product supplier.");
        }

        return ValidationResult.Success!;
    }
}
