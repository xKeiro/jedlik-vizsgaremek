using backend.Enums;
using backend.Models;
using backend.Models.Orders;
using backend.Models.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;


namespace backend.Services
{
    public class JedlikContext : DbContext
    {
        public JedlikContext(DbContextOptions<JedlikContext> options) : base(options)
        {
        }

        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<ProductOrder> ProductOrders { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductCategory> ProductCategories { get; set; }
        public virtual DbSet<ProductReview> ProductReviews { get; set; }
        public virtual DbSet<ProductSupplier> ProductSuppliers { get; set; }
        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Shipper> Shippers { get; set; }
        public virtual DbSet<Supplier> Suppliers { get; set; }
        public virtual DbSet<User> Users { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            _ = modelBuilder
                .Entity<Address>()
                .Property(address => address.Country)
                .HasConversion(new EnumToStringConverter<CountryCode>());
            _ = modelBuilder
                .Entity<Order>()
                .Property(order => order.Status)
                .HasConversion(new EnumToStringConverter<OrderStatus>());
            _ = modelBuilder.Entity<Order>().Navigation(o => o.ProductOrders).AutoInclude();
            _ = modelBuilder.Entity<ProductSupplier>().Navigation(ps => ps.Product).AutoInclude();
        }
    }
}
