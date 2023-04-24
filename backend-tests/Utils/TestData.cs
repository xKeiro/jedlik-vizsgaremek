using backend.Models.Products;

namespace backend_tests.Utils;

public static class TestData
{
    public static List<ProductCategory> productCategories { get; set; } = new()
    {
        new()
        {
            Id = 1,
            Title = "Test Title",
            Description = "Test Description",
        },
        new()
        {
            Id = 2,
            Title = "Test Title 2",
            Description = "Test Description 2",
        },
        new()
        {
            Id = 3,
            Title = "Test Title 3",
            Description = "Test Description 3",
        }
    };
}