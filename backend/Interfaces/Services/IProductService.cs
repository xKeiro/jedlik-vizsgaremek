﻿using backend.Dtos.Products;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IProductService
{
    IAsyncEnumerable<ProductPublic> GetNotDiscontinued();
    Task<OneOf<ProductPublic, StatusMessage>> Add(ProductRegister productRegister);
    IAsyncEnumerable<ProductPublic> GetNotDiscontinuedByCategoryId(ulong categoryId);
    IAsyncEnumerable<ProductPublic> GetFeatured();
    IAsyncEnumerable<ProductPublic> GetAll();
    Task<OneOf<ProductPublic, StatusMessage>> FindById(ulong productId);
    Task<OneOf<ProductPublic, StatusMessage>> Update(ulong productId, ProductRegister productRegister);
    Task<StatusMessage> Discontinue(ulong productId);
}
