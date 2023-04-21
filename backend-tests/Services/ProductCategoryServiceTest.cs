using AutoMapper;
using backend.Dtos.Products.ProductCategories;
using backend.Models.Products;
using backend.Services;
using backend_tests.Utils;
using NUnit.Framework;

namespace backend_tests.Services;

public class ProductCategoryServiceTest
{
    private JedlikContext _context;
    private IMapper _mapper;
    private ProductCategoryService _productCategoryService;
    private StatusMessageService<ProductCategory> _statusMessage;

    [SetUp]
    public void Setup()
    {
        _context = InMemoryDatabaseHelper.GetInMemoryDatabaseContext("ProductCategoriesDb");
        _mapper = MapperHelper.GetMapper();
        _statusMessage = new StatusMessageService<ProductCategory>();
        _context.ChangeTracker.Clear();
        _context.ProductCategories.AddRange(TestData.productCategories);
        _context.SaveChanges();
        _context.ChangeTracker.Clear();
        _productCategoryService = new ProductCategoryService(_context, _mapper, _statusMessage);
    }

    [TearDown]
    public void TearDown()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }

    [Test]
    public async Task GetAll_ShouldReturnAllProductCategories()
    {
        // Arrange
        var expected = _mapper.Map<List<ProductCategory>, List<ProductCategoryPublic>>(TestData.productCategories);
        // Act
        var actual = await _productCategoryService.GetAll();
        // Assert
        AssertByJson.AreEqual(expected, actual);
    }
}