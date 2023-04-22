using backend.Dtos.Users;
using backend.Utils;

namespace backend.Dtos.Auth;

public class AuthResult
{
    public required string JwtToken { get; set; }
    public required UserPublic UserPublic { get; set; }
    public CookieOptions cookieOptionForJwt => new CookieOptions()
    {
        HttpOnly = true,
        SameSite = SameSiteMode.Strict,
        Secure = true,
        Expires = DateTime.Now.AddDays(EnvironmentVariableHelper.JwtTokenExpirationDay)
    };
}
