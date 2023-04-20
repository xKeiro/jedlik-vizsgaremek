using backend.Services;

namespace backend.Data;

public static class DbInitializer
{
    public static void Seed(IApplicationBuilder applicationBuilder)
    {
        using var serviceScope = applicationBuilder.ApplicationServices.CreateScope();
        var context = serviceScope.ServiceProvider.GetService<JedlikContext>();

        if (context == null)
        {
            return;
        }

        _ = context.Database.EnsureCreated();

        if (context.ProductCategories.Any())
        {
            return;
        }

    }
}