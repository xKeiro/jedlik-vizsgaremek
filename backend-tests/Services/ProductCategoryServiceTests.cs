using AutoMapper;
using backend.Dtos.Products.ProductCategories;
using backend.Models.Products;
using backend.Services;
using backend_tests.Utils;
using NUnit.Framework;
using FluentAssertions;

namespace backend_tests.Services;

[TestFixture]
public class ProductCategoryServiceTests
{
    private JedlikContext _context;
    private IMapper _mapper;
    private ProductCategoryService _productCategoryService;
    private StatusMessageService _statusMessage;

    [SetUp]
    public void Setup()
    {
        _context = InMemoryDatabaseHelper.GetInMemoryDatabaseContext("ProductCategoriesDb");
        _mapper = MapperHelper.GetMapper();
        _statusMessage = new StatusMessageService();
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
        actual.Should().BeEquivalentTo(expected);
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
        var expected = _statusMessage.NotFound404<ProductCategory>(notExistingId);
        // Act
        var actual = await _productCategoryService.Find(notExistingId);
        // Assert
        actual.IsT0.Should().BeFalse();
        actual.AsT1.Should().BeEquivalentTo(expected);
    }

    [Test]
    public async Task Add_ShouldCreateNewProductCategoryAndReturnItInTheFormOfOneOfProductCategoryPublic()
    {
        // Arrange
        var newProductCategory = new ProductCategoryWithoutId()
        {
            Title = "New Title",
            Description = "New Description",
        };
        var expectedCount = TestData.productCategories.Count + 1;
        var expectedId = (ulong)expectedCount;
        var expected = new ProductCategoryPublic()
        {
            Id = expectedId,
            Title = newProductCategory.Title,
            Description = newProductCategory.Description,
        };

        // Act
        var actual = await _productCategoryService.Add(newProductCategory);
        // Assert
        _context.ProductCategories.Should().HaveCount(expectedCount);
        actual.AsT0.Should().BeEquivalentTo(expected);
        actual.IsT1.Should().BeFalse();
    }

    [Test]
    public async Task Add_ShouldReturnOneOfStatusMessageNotUniqueIfAlreadyExistingTitleProvidedAndShouldNotBeAddedToTheDatabase()
    {
        // Arrange
        var newProductCategory = new ProductCategoryWithoutId()
        {
            Title = TestData.productCategories[0].Title,
            Description = "New Description",
        };
        var expectedCount = TestData.productCategories.Count;
        var expected = _statusMessage.NotUnique409<ProductCategory>(new List<string>() { "Title" });
        // Act
        var actual = await _productCategoryService.Add(newProductCategory);
        // Assert
        _context.ProductCategories.Should().HaveCount(expectedCount);
        actual.IsT0.Should().BeFalse();
        actual.AsT1.Should().BeEquivalentTo(expected);
    }

    [Test]
    public async Task Update_ShouldUpdateProductCategoryAndReturnItInTheFormOfOneOfProductCategoryPublic()
    {
        // Arrange
        var updatedProductCategory = new ProductCategoryWithoutId()
        {
            Title = "Updated Title",
            Description = "Updated Description",
        };
        var expected = new ProductCategoryPublic()
        {
            Id = 1,
            Title = updatedProductCategory.Title,
            Description = updatedProductCategory.Description,
        };
        // Act
        var actual = await _productCategoryService.Update(expected.Id, updatedProductCategory);
        // Assert
        actual.AsT0.Should().BeEquivalentTo(expected);
        actual.IsT1.Should().BeFalse();
    }

    [Test]
    public async Task Update_ShouldReturnOneOfStatusMessageNotFoundIfNotExistingIdProvided()
    {
        // Arrange
        var updatedProductCategory = new ProductCategoryWithoutId()
        {
            Title = "Updated Title",
            Description = "Updated Description",
        };
        ulong nonExistingId = 999;
        var expected = _statusMessage.NotFound404<ProductCategory>(nonExistingId);
        // Act
        var actual = await _productCategoryService.Update(nonExistingId, updatedProductCategory);
        // Assert
        actual.IsT0.Should().BeFalse();
        actual.AsT1.Should().BeEquivalentTo(expected);
    }

    [Test]
    public async Task Update_ShouldReturnOneOfStatusMessageNotUniqueIfAlreadyExistingTitleProvided()
    {
        // Arrange
        var updatedProductCategory = new ProductCategoryWithoutId()
        {
            Title = TestData.productCategories[1].Title,
            Description = "Updated Description",
        };
        ulong id = 1;
        var expected = _statusMessage.NotUnique409<ProductCategory>(new List<string>() { "Title" });
        // Act
        var actual = await _productCategoryService.Update(id, updatedProductCategory);
        // Assert
        actual.IsT0.Should().BeFalse();
        actual.AsT1.Should().BeEquivalentTo(expected);
    }
    [Test]
    public async Task Update_ShouldReturnOneOfProductCategoryPublicIfTheSameTitleProvidedAsTheOriginal()
    {
        // Arrange
        var updatedProductCategory = new ProductCategoryWithoutId()
        {
            Title = TestData.productCategories[0].Title,
            Description = "Updated Description",
        };
        ulong id = TestData.productCategories[0].Id;
        var expected = new ProductCategoryPublic()
        {
            Id = id,
            Title = updatedProductCategory.Title,
            Description = updatedProductCategory.Description,
        };
        // Act
        var actual = await _productCategoryService.Update(id, updatedProductCategory);
        // Assert
        actual.AsT0.Should().BeEquivalentTo(expected);
        actual.IsT1.Should().BeFalse();
    }
}