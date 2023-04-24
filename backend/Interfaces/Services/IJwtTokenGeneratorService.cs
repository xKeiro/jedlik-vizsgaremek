using backend.Models;

namespace backend.Interfaces.Services;

public interface IJwtTokenGeneratorService
{
    public string GenerateToken(User user);
}