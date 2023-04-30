using backend.Interfaces.Services;
using backend.Services;
using backend.Utils;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace backend.Extensions;

public static class CustomServicesExtension
{
    public static void AddCustomServices(this IServiceCollection services) => services
        .AddSingleton<IStatusMessageService, StatusMessageService>()
        .AddSingleton<IJwtTokenGeneratorService, JwtTokenGeneratorService>()
        .AddScoped<IAuthService, AuthService>()
        .AddScoped<IUserService, UserService>()
        .AddScoped<IProductCategoryService, ProductCategoryService>()
        .AddScoped<IProductService, ProductService>()
        .AddScoped<IOrdersService, OrdersService>()
        .AddScoped<IProductReviewService, ProductReviewService>()
        .AddScoped<ISupplierService, SupplierService>()
        .AddScoped<IProductSupplierService, ProductSupplierService>()
        .AddScoped<IShipperService, ShipperService>()
        .AddScoped<IImageService, ImageService>();

    public static void ConfigureCors(this IServiceCollection services) => services
        .AddCors(options => options.AddPolicy("corspolicy",
    builder => builder.WithOrigins(EnvironmentVariableHelper.FrontendUrl)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
        ));
    public static void ConfigureJsonSerializer(this IServiceCollection services) => services
        .AddControllers()
        .AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles)
        .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
    public static void ConfigureDbContext(this IServiceCollection services) => services
        .AddDbContext<JedlikContext>(options =>
                   options.UseSqlServer(EnvironmentVariableHelper.ConnectionString));

}
