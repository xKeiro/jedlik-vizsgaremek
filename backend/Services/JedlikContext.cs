using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class JedlikContext : DbContext
    {
        public JedlikContext(DbContextOptions<JedlikContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Method intentionally left empty for future expansion.
        }
    }
}
