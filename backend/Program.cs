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
builder.Services.AddOutputCache();

builder.Services.AddControllers().AddJsonOptions(options =>
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
);
builder.Services.AddControllers()
    .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
builder.Services.AddHealthChecks();
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddDbContext<JedlikContext>(options =>
    options.UseSqlServer(EnvironmentVariableHelper.ConnectionString));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IStatusMessageService, StatusMessageService>();
builder.Services.AddSingleton<IJwtTokenGeneratorService, JwtTokenGeneratorService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductCategoryService, ProductCategoryService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IOrdersService, OrdersService>();
builder.Services.AddScoped<IProductReviewService, ProductReviewService>();
builder.Services.AddScoped<ISupplierService, SupplierService>();
builder.Services.AddScoped<IProductSupplierService, ProductSupplierService>();
builder.Services.AddScoped<IShipperService, ShipperService>();
builder.Services.AddScoped<IImageService, ImageService>();

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