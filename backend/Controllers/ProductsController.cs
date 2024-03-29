﻿using backend.Conventions;
using backend.Dtos.Images;
using backend.Dtos.Products;
using backend.Interfaces.Services;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
[ApiConventionType(typeof(ProductConventions<ProductRegister, ProductUpdate>))]
public class ProductsController : ApiControllerBase
{
    private readonly IProductService _service;

    public ProductsController(IProductService service)
    {
        _service = service;
    }
    [HttpGet]
    [OutputCache(Duration = 120)]
    public async Task<ActionResult<ProductPublicWithPagination>> GetNotDiscontinued(int page = 1, int pageSize = 10)
        => Ok(await _service.GetNotDiscontinued(page,pageSize));
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductPublic>> Add(ProductRegister productRegister)
     => (await _service.Add(productRegister)).Match(Created, Problem);
    [HttpGet("Category/{categoryId}")]
    public async Task<ActionResult<ProductPublicWithPagination>> GetNotDiscontinuedByCategoryId(ulong categoryId, int page = 1, int pageSize = 10)
        => Ok(await _service.GetNotDiscontinuedByCategoryId(categoryId, page, pageSize));
    [HttpGet("Featured")]
    [OutputCache(Duration = 120)]
    public async Task<ActionResult<List<ProductPublic>>> GetFeatured()
        => Ok(await _service.GetFeatured());
    [HttpGet("All")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<ProductPublic>>> GetAll()
        => Ok(await _service.GetAll());
    [HttpGet("{productId}")]
    [OutputCache(Duration = 60)]

    public async Task<ActionResult<ProductPublic>> GetById(ulong productId)
        => (await _service.FindById(productId)).Match(Ok, Problem);
    [HttpPut("{productId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProductPublic>> Update(ulong productId, ProductUpdate productUpdate)
        => (await _service.Update(productId, productUpdate)).Match(Ok, Problem);
    [HttpPatch("{productId}/Discontinue")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<StatusMessage>> Discontinue(ulong productId)
    {
        var result = await _service.Discontinue(productId);
        if (result.StatusCode == StatusCodes.Status200OK)
        {
            return Ok(result);
        }
        else
        {
            return Problem(result);
        }
    }
    [HttpPost("{productId}/Image")]
    [Authorize(Roles = "Admin")]

    public async Task<ActionResult<ImagePublic>> SaveImage(ulong productId, IFormFile image)
        => (await _service.SaveImage(productId, image)).Match(Ok, Problem);
}
