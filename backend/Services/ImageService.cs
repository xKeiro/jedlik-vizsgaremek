using backend.Interfaces.Services;
using backend.Models;
using OneOf;

namespace backend.Services;

public class ImageService : IImageService
{
    private readonly IStatusMessageService _statusMessage;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly string[] ALLOWED_IMAGE_TYPES = new string[] { "image/jpeg", "image/png", "image/gif", "image/tiff" };
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
        var (relativePath, path) = GetImagePath(id, nameOfModel);
        _ = Directory.CreateDirectory(Path.GetDirectoryName(path)!);
        await using (var webpFileStream = new FileStream(path, FileMode.Create))
        {
            using (Image newImage = Image.Load(image.OpenReadStream()))
            {
                int width = newImage.Width;
                if (width > 800)
                {
                    newImage.Mutate(x => x.Resize(800, 0, KnownResamplers.Lanczos3));
                }
                await newImage.SaveAsWebpAsync(webpFileStream);
            }
        }
        return relativePath;
    }

    private (string relativePath, string path) GetImagePath(ulong id, string nameOfModel)
    {
        var relativePath = $"api/Images/{nameOfModel}/{id}.webp";
        var path = Path.Combine(_webHostEnvironment.WebRootPath, relativePath);
        return (relativePath, path);
    }


}
