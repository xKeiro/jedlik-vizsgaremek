using backend.Dtos.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;

namespace backend.Conventions;

public static class AuthConventions
{
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public static void Register([ApiConventionNameMatch(ApiConventionNameMatchBehavior.Any)] UserRegister registerDto)
    {
        // Method intentionally left empty.
    }
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public static void Login([ApiConventionNameMatch(ApiConventionNameMatchBehavior.Any)] UserLogin loginDto)
    {
        // Method intentionally left empty.
    }
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public static void Logout()
    {
        // Method intentionally left empty.
    }
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(void), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public static void RefreshToken()
    {
        // Method intentionally left empty.
    }
}
