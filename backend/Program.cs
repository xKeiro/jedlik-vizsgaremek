using backend.Data;
using backend.Extensions;
using backend.Maps;
using backend.Services;
using backend.Utils;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
JwtTokenConfiguration.ConfigureJwtAuthentication(builder.Services);
CustomServicesExtension.ConfigureCors(builder.Services);
builder.Services.AddOutputCache();
CustomServicesExtension.ConfigureJsonSerializer(builder.Services);
builder.Services.AddHealthChecks();
builder.Services.AddAutoMapper(typeof(MappingProfile));
CustomServicesExtension.ConfigureDbContext(builder.Services);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
CustomServicesExtension.AddCustomServices(builder.Services);

var app = builder.Build();
app.UseStaticFiles();
app.UseExceptionHandler("/Error");
app.MapHealthChecks("/api/HealthChecker");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    _ = app.UseSwagger();
    _ = app.UseSwaggerUI();
}

app.UseCors("corspolicy");

app.UseAuthentication();
app.UseAuthorization();
app.UseOutputCache();

app.MapControllers();

DbInitializer.Seed(app);

app.Run();