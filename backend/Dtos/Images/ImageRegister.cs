using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Images;

public class ImageRegister
{
    [Required]
    public required IFormFile Image { get; set; }
}
