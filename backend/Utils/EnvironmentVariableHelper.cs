﻿using System.Configuration;

namespace backend.Utils;

public static class EnvironmentVariableHelper
{
    public static string ConnectionString => GetDbConnectionString();
    public static string JwtTokenKey => Get("JWT_TOKEN_KEY");
    public static string JwtTokenIssuer => Get("JWT_TOKEN_ISSUER");
    public static string JwtTokenAudience => Get("JWT_TOKEN_AUDIENCE");
    public static int JwtTokenExpirationDay => int.Parse(Get("JWT_TOKEN_EXPIRATION_DAY"));
    public static string FrontendUrl => Get("FRONTEND_URL");

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
