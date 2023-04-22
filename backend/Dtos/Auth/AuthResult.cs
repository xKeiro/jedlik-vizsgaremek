using backend.Dtos.Users;

namespace backend.Dtos.Auth;

public class AuthResult
{
    public required string JwtToken { get; set; }
    public required UserPublic UserPublic { get; set; }
}
