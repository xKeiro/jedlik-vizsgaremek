using backend.Services;
using Microsoft.EntityFrameworkCore;

namespace backend_tests.Utils;

public static class InMemoryDatabaseHelper
{
    public static JedlikContext GetInMemoryDatabaseContext(string databaseName)
    {
        var options = new DbContextOptionsBuilder<JedlikContext>()
            .UseInMemoryDatabase(databaseName: databaseName)
            .Options;
        var context = new JedlikContext(options);
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();
        return context;
    }
}