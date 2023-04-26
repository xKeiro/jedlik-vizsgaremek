using backend.Dtos.Images;
using backend.Models;
using OneOf;

namespace backend.Interfaces.Services;

public interface IImageService
{
    Task<OneOf<string, StatusMessage>> SaveImage(IFormFile image, ulong id, string nameOfModel);
}
