﻿using AutoMapper;
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
        var expected = _statusMessage.NotFound(notExistingId);
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
        var expected = _statusMessage.NotUnique(new List<string>() { "Title" });
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
        var updatedProductCategory = new ProductCategoryPublic()
        {
            Id = 1,
            Title = "Updated Title",
            Description = "Updated Description",
        };
        var expected = _mapper.Map<ProductCategoryPublic, ProductCategory>(updatedProductCategory);
        // Act
        var actual = await _productCategoryService.Update(updatedProductCategory);
        // Assert
        actual.AsT0.Should().BeEquivalentTo(expected);
        actual.IsT1.Should().BeFalse();
    }

    [Test]
    public async Task Update_ShouldReturnOneOfStatusMessageNotFoundIfNotExistingIdProvided()
    {
        // Arrange
        var updatedProductCategory = new ProductCategoryPublic()
        {
            Id = 999,
            Title = "Updated Title",
            Description = "Updated Description",
        };
        var expected = _statusMessage.NotFound(updatedProductCategory.Id);
        // Act
        var actual = await _productCategoryService.Update(updatedProductCategory);
        // Assert
        actual.IsT0.Should().BeFalse();
        actual.AsT1.Should().BeEquivalentTo(expected);
    }

    [Test]
    public async Task Update_ShouldReturnOneOfStatusMessageNotUniqueIfAlreadyExistingTitleProvided()
    {
        // Arrange
        var updatedProductCategory = new ProductCategoryPublic()
        {
            Id = 1,
            Title = TestData.productCategories[1].Title,
            Description = "Updated Description",
        };
        var expected = _statusMessage.NotUnique(new List<string>() { "Title" });
        // Act
        var actual = await _productCategoryService.Update(updatedProductCategory);
        // Assert
        actual.IsT0.Should().BeFalse();
        actual.AsT1.Should().BeEquivalentTo(expected);
    }
}