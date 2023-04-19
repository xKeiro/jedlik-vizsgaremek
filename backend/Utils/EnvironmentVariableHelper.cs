using System.Configuration;

namespace backend.Utils;

public static class EnvironmentVariableHelper
{
    public static string ConnectionString { get => GetDbConnectionString(); }
    public static string JwtTokenKey { get => Get("JWT_TOKEN_KEY"); }
    public static string FrontendUrl { get => Get("FRONTEND_URL"); }

    private static string GetDbConnectionString()
    {
        var envKeyDbServer = "DB_SERVER";
        var dbServer = Environment.GetEnvironmentVariable(envKeyDbServer);
        ThrowErrorIfEnvironmentVariableNotExists(envKeyDbServer, dbServer);
        var envKeyDbDatabase = "DB_DATABASE";
        var dbDatabase = Environment.GetEnvironmentVariable(envKeyDbDatabase);
        ThrowErrorIfEnvironmentVariableNotExists(envKeyDbDatabase, dbDatabase);
        var envKeyDbId = "DB_ID";
        var dbId = Environment.GetEnvironmentVariable(envKeyDbId);
        ThrowErrorIfEnvironmentVariableNotExists(envKeyDbId, dbId);
        var envKeyDbPassword = "DB_PASSWORD";
        var dbPassword = Environment.GetEnvironmentVariable(envKeyDbPassword);
        ThrowErrorIfEnvironmentVariableNotExists(envKeyDbPassword, dbPassword);
        return $"Server={dbServer};Database={dbDatabase};User Id={dbId};Password={dbPassword};MultipleActiveResultSets=true;TrustServerCertificate=True";
    }

    private static string Get(string envKey)
    {
        var envVariable = Environment.GetEnvironmentVariable(envKey);
        ThrowErrorIfEnvironmentVariableNotExists(envKey, envVariable);
        return envVariable!;

    }
    private static void ThrowErrorIfEnvironmentVariableNotExists(string envKey, string? envValue)
    {
        if (string.IsNullOrEmpty(envValue))
        {
            throw new ConfigurationErrorsException($"Missing \"{envKey}\" environment variable!");
        }
    }
}
