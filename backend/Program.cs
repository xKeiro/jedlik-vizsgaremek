using backend.Data;
using backend.Extensions;
using backend.Interfaces.Services;
using backend.Maps;
using backend.Services;
using backend.Utils;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

JwtTokenConfiguration.ConfigureJwtAuthentication(builder.Services);

builder.Services.AddCors(p => p.AddPolicy("corspolicy",
    builder => builder.WithOrigins(EnvironmentVariableHelper.FrontendUrl)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
        ));

builder.Services.AddControllers().AddJsonOptions(options =>
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
);
builder.Services.AddControllers()
    .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddDbContext<JedlikContext>(options =>
    options.UseSqlServer(EnvironmentVariableHelper.ConnectionString));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IStatusMessageService, StatusMessageService>();
builder.Services.AddSingleton<IJwtTokenGeneratorService, JwtTokenGeneratorService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IProductCategoryService, ProductCategoryService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    _ = app.UseSwagger();
    _ = app.UseSwaggerUI();
}

//app.UseExceptionHandler("/Error");
app.UseHttpsRedirection();

app.UseCors("corspolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

DbInitializer.Seed(app);

app.Run();