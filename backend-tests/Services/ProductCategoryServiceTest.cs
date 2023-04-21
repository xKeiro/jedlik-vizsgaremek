using AutoMapper;
using backend.Dtos.Products.ProductCategories;
using backend.Models.Products;
using backend.Services;
using backend_tests.Utils;
using NUnit.Framework;
using FluentAssertions;

namespace backend_tests.Services;

[TestFixture]
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

    [Test]
    public async Task Find_ShouldReturnOneOfProductCategory()
    {
        // Arrange
        var expected = _mapper.Map<ProductCategory, ProductCategoryPublic>(TestData.productCategories[0]);
        // Act
        var actual = await _productCategoryService.Find(TestData.productCategories[0].Id);
        // Assert
        actual.AsT0.Should().BeEquivalentTo(expected);
        actual.IsT1.Should().BeFalse();
    }

    [Test]
    public async Task Find_ShouldReturnOneOfStatusMessageNotFoundIfNotExistingIdProvided()
    {
        // Arrange
        ulong notExistingId = 999;
        var expected = _statusMessage.NotFound(notExistingId);
        // Act
        var actual = await _productCategoryService.Find(notExistingId);
        // Assert
        actual.IsT0.Should().BeFalse();
        actual.AsT1.Should().BeEquivalentTo(expected);
    }
}