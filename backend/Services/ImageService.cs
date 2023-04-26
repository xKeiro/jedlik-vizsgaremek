﻿using AutoMapper;
using backend.Dtos.Images;
using backend.Interfaces.Services;
using backend.Models;
using ImageProcessor.Plugins.WebP.Imaging.Formats;
using ImageProcessor;
using OneOf;

namespace backend.Services;

public class ImageService: IImageService
{
    private readonly IStatusMessageService _statusMessage;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly string[] ALLOWED_IMAGE_TYPES = new string[] { "image/jpeg", "image/png" };
    public ImageService(IStatusMessageService statusMessage, IWebHostEnvironment webHostEnvironment)
    {
        _statusMessage = statusMessage;
        _webHostEnvironment = webHostEnvironment;
    }
    public async Task<OneOf<string, StatusMessage>> SaveImage(IFormFile image, ulong id, string nameOfModel)
    {
        if (!(ALLOWED_IMAGE_TYPES.Contains(image.ContentType) && image.Length > 0))
        {
            return _statusMessage.WrongImageType400(ALLOWED_IMAGE_TYPES);
        }
        var relativePath = $"Images/{nameOfModel}/{id}.webp";
        var path = Path.Combine(_webHostEnvironment.WebRootPath, relativePath);

        await using (var webpFileStream = new FileStream(path, FileMode.Create))
        {
            using (ImageFactory imageFactory = new ImageFactory(preserveExifData: false))
            {
                imageFactory.Load(image.OpenReadStream())
                            .Format(new WebPFormat())
                            .Quality(50)
                            .Save(webpFileStream);
            }
        }
        return relativePath;
    }
    

}
