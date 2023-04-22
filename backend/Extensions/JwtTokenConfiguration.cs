using backend.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace backend.Extensions;

public static class JwtTokenConfiguration
{
    public static void ConfigureJwtAuthentication(this IServiceCollection services) => services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    // Specify the validation settings for the JWT token
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = EnvironmentVariableHelper.JwtTokenIssuer,
                    ValidAudience = EnvironmentVariableHelper.JwtTokenAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(EnvironmentVariableHelper.JwtTokenKey))
                };
                options.Events = new JwtBearerEvents
                {
                    // Set the bearer token from cookie
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies["token"];
                        return Task.CompletedTask;
                    }
                };
            });
}
