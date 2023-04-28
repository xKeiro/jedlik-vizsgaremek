using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Images;

public class ImagePublic
{
    [Required]
    [MinLength(3), MaxLength(200)]
    public required string ImagePath { get; set; }
}
