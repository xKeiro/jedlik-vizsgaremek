using backend.Interfaces.Services;
using backend.Models;
using backend.Utils;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Services;

public class JwtTokenGeneratorService: IJwtTokenGeneratorService
{
    public string GenerateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" : "User")
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(EnvironmentVariableHelper.JwtTokenKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        var token = new JwtSecurityToken(
            issuer: EnvironmentVariableHelper.JwtTokenIssuer,
            audience: EnvironmentVariableHelper.JwtTokenAudience,
            claims: claims,
            expires: DateTime.Now.AddDays(EnvironmentVariableHelper.JwtTokenExpirationDay),
            signingCredentials: creds);
        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }
}
