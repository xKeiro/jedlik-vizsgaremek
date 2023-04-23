using backend.Enums;
using backend.Models;
using backend.Models.Orders;
using backend.Models.Products;
using backend.Services;
using Microsoft.EntityFrameworkCore;

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

        if (context.Products.Any() || context.Addresses.Any())
        {
            return;
        }
        #region CountriesWithVat
        var countriesWithVat = new List<CountryWithVat>
        {
            new CountryWithVat { Country = "Austria", Vat = 20 },
            new CountryWithVat { Country = "Belgium", Vat = 21 },
            new CountryWithVat { Country = "Bulgaria", Vat = 20 },
            new CountryWithVat { Country = "Croatia", Vat = 25 },
            new CountryWithVat { Country = "Cyprus", Vat = 19 },
            new CountryWithVat { Country = "Czechia", Vat = 21 },
            new CountryWithVat { Country = "Denmark", Vat = 25 },
            new CountryWithVat { Country = "Estonia", Vat = 20 },
            new CountryWithVat { Country = "Finland", Vat = 24 },
            new CountryWithVat { Country = "France", Vat = 20 },
            new CountryWithVat { Country = "Germany", Vat = 19 },
            new CountryWithVat { Country = "Greece", Vat = 24 },
            new CountryWithVat { Country = "Hungary", Vat = 27 },
            new CountryWithVat { Country = "Ireland", Vat = 23 },
            new CountryWithVat { Country = "Italy", Vat = 22 },
            new CountryWithVat { Country = "Latvia", Vat = 21 },
            new CountryWithVat { Country = "Lithuania", Vat = 21 },
            new CountryWithVat { Country = "Luxembourg", Vat = 17 },
            new CountryWithVat { Country = "Malta", Vat = 18 },
            new CountryWithVat { Country = "Netherlands", Vat = 21 },
            new CountryWithVat { Country = "Poland", Vat = 23 },
            new CountryWithVat { Country = "Portugal", Vat = 23 },
            new CountryWithVat { Country = "Romania", Vat = 19 },
            new CountryWithVat { Country = "Slovakia", Vat = 20 },
            new CountryWithVat { Country = "Slovenia", Vat = 22 },
            new CountryWithVat { Country = "Spain", Vat = 21 },
            new CountryWithVat { Country = "Sweden", Vat = 25 }
        };
        #endregion
        context.CountriesWithVat.AddRange(countriesWithVat);

        #region Addresses
        var addresses = new List<Address>
        {
            new Address()
            {
                Id = 1,
                Street = "7019 Talicska utca",
                City = "Sopron",
                Region = "Győr-Moson-Sopron",
                PostalCode = "9404",
                CountryWithVat = countriesWithVat[9]
            },
            new Address()
            {
                Id = 2,
                Street = "4 Almo Center",
                City = "Vienna",
                Region = "Lower Austria",
                PostalCode = "1011",
                CountryWithVat = countriesWithVat[0]
            },
            new Address()
            {
                Id = 3,
                Street = "28 Birchwood Road",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1111",
                CountryWithVat = countriesWithVat[0]
            },
            new Address()
            {
                Id = 4,
                Street = "8 Vahlen Park",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1046",
                CountryWithVat = countriesWithVat[0]
            },
            new Address()
            {
                Id = 5,
                Street = "8588 Moose Point",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1086",
                CountryWithVat = countriesWithVat[0]
            },
            new Address()
            {
                Id = 6,
                Street = "88 Springview Drive",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1097",
                CountryWithVat = countriesWithVat[0]
            },
            new Address()
            {
                Id = 7,
                Street = "1770 Sachtjen Road",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1194",
                CountryWithVat = countriesWithVat[0]
            },
            new Address()
            {
                Id = 8,
                Street = "88898 Londonderry Street",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1158",
                CountryWithVat = countriesWithVat[0]
            },
            new Address()
            {
                Id = 9,
                Street = "3686 Westridge Alley",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1239",
                CountryWithVat = countriesWithVat[0]
            },
            new Address()
            {
                Id = 10,
                Street = "62 Amoth Trail",
                City = "Sopron",
                Region = "Győr-Moson-Sopron",
                PostalCode = "9404",
                CountryWithVat = countriesWithVat[0]
            },
            new Address()
            {
                Id = 11,
                Street = "82849 Memorial Court",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1024",
                CountryWithVat = countriesWithVat[0]
            },
            new Address()
            {
                Id = 12,
                Street = "61988 Duke Circle",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1122",
                CountryWithVat = countriesWithVat[0]
            },
            new Address()
            {
                Id = 13,
                Street = "010 Ridgeview Lane",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1046",
                CountryWithVat = countriesWithVat[0]
            },
            new Address()
            {
                Id = 14,
                Street = "6 Marcy Plaza",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1111",
                CountryWithVat = countriesWithVat[0]
            },
            new Address()
            {
                Id = 15,
                Street = "23 Rue de la République",
                City = "Paris",
                Region = "Île-de-France",
                PostalCode = "75001",
                CountryWithVat = countriesWithVat[9]
            },

            new Address()
            {
                Id = 16,
                Street = "Ul. Kraszewskiego 12/4",
                City = "Warsaw",
                Region = "Mazowieckie",
                PostalCode = "00-123",
                CountryWithVat = countriesWithVat[4]
            },

            new Address()
            {
                Id = 17,
                Street = "Calle de Alcalá 54",
                City = "Madrid",
                Region = "Madrid",
                PostalCode = "28014",
                CountryWithVat = countriesWithVat[5]
            },

            new Address()
            {
                Id = 18,
                Street = "Viale Regina Margherita 6",
                City = "Rome",
                Region = "Lazio",
                PostalCode = "00198",
                CountryWithVat = countriesWithVat[3]
            },

            new Address()
            {
                Id = 19,
                Street = "Karl-Marx-Allee 90",
                City = "Berlin",
                Region = "Berlin",
                PostalCode = "10243",
                CountryWithVat = countriesWithVat[7]
            },
            new Address()
            {
                Id = 20,
                Street = "Strada Statale 16 Km 23",
                City = "Bari",
                Region = "Puglia",
                PostalCode = "70126",
                CountryWithVat = countriesWithVat[3]
            },

            new Address()
            {
                Id = 21,
                Street = "Lange Voorhout 34",
                City = "The Hague",
                Region = "South Holland",
                PostalCode = "2514 EE",
                CountryWithVat = countriesWithVat[13]
            },

            new Address()
            {
                Id = 22,
                Street = "Kungsgatan 37",
                City = "Stockholm",
                Region = "Stockholm",
                PostalCode = "111 56",
                CountryWithVat = countriesWithVat[14]
            },

            new Address()
            {
                Id = 23,
                Street = "Rruga e Kavajës 153",
                City = "Viena",
                Region = "Viena",
                PostalCode = "1001",
                CountryWithVat = countriesWithVat[0]
            },

            new Address()
            {
                Id = 24,
                Street = "Praça do Comércio 12",
                City = "Lisbon",
                Region = "Lisbon",
                PostalCode = "1100-148",
                CountryWithVat = countriesWithVat[15]
            },
            new Address()
            {
                Id = 25,
                Street = "Boulevard du Jardin Exotique 7",
                City = "Aslova",
                Region = "Slva",
                PostalCode = "98000",
                CountryWithVat = countriesWithVat[18]
            },

            new Address()
            {
                Id = 26,
                Street = "Karl-Liebknecht-Straße 3",
                City = "Leipzig",
                Region = "Saxony",
                PostalCode = "04107",
                CountryWithVat = countriesWithVat[19]
            },

            new Address()
            {
                Id = 27,
                Street = "Avenue Louise 231",
                City = "Brussels",
                Region = "Brussels-Capital",
                PostalCode = "1050",
                CountryWithVat = countriesWithVat[2]
            },

            new Address()
            {
                Id = 28,
                Street = "Paseo de la Castellana 259",
                City = "Madrid",
                Region = "Madrid",
                PostalCode = "28046",
                CountryWithVat = countriesWithVat[13]
            },

            new Address()
            {
                Id = 29,
                Street = "Rue du Faubourg Saint-Honoré 55",
                City = "Paris",
                Region = "Île-de-France",
                PostalCode = "75008",
                CountryWithVat = countriesWithVat[12]
            }
        };
        context.AddRangeAsync(addresses);
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Addresses ON");
        context.SaveChanges();
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Addresses OFF");
        context.SaveChanges();
        #endregion Addresses

        #region ProductCategories 
        var productCategories = new List<ProductCategory>(){
            new()
            {
                Id = 1,
                Title = "Cases",
                Description = "A computer case, also known as a computer chassis, is the enclosure that contains most of the components of a personal computer (usually excluding the display, keyboard, and mouse)"
            },
            new()
            {
                Id = 2,
                Title = "Coolers",
                Description = "Computer cooling is required to remove the waste heat produced by computer components, to keep components within permissible operating temperature limits."
            },
            new()
            {
                Id = 3,
                Title = "CPUs",
                Description = "A central processing unit (CPU), also called a central processor, main processor or just processor, is the electronic circuitry that executes instructions comprising a computer program."
            },
            new()
            {
                Id = 4,
                Title = "HDDs",
                Description = "A hard disk drive (HDD), hard disk, hard drive, or fixed disk is an electro-mechanical data storage device that stores and retrieves digital data using magnetic storage with one or more rigid rapidly rotating platters coated with magnetic material."
            },
            new()
            {
                Id = 5,
                Title = "Memory",
                Description = "In computing, memory is a device or system that is used to store information for immediate use in a computer or related computer hardware and digital electronic devices."
            },
            new()
            {
                Id = 6,
                Title = "Motherboards",
                Description = "A motherboard (also called mainboard, main circuit board, mb, mboard, backplane board, base board, system board, logic board (only in Apple computers) or mobo) is the main printed circuit board (PCB) in general-purpose computers and other expandable systems"
            },
            new()
            {
                Id = 7,
                Title = "Power Supplies",
                Description = "A power supply is an electrical device that supplies electric power to an electrical load. The main purpose of a power supply is to convert electric current from a source to the correct voltage, current, and frequency to power the load."
            },
            new()
            {
                Id = 8,
                Title = "SSDs",
                Description = "A solid-state drive (SSD) is a solid-state storage device that uses integrated circuit assemblies to store data persistently, typically using flash memory, and functioning as secondary storage in the hierarchy of computer storage."
            },
            new()
            {
                Id = 9,
                Title = "Video Cards",
                Description = "A graphics card (also called a video card, display card, graphics adapter, GPU, VGA card/VGA, video adapter, or display adapter) is an expansion card which generates a feed of output images to a display device, such as a computer monitor."
            }
        };
        context.AddRangeAsync(productCategories);
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT ProductCategories ON");
        context.SaveChanges();
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT ProductCategories OFF");
        context.SaveChanges();
        #endregion

        #region Shippers 
        var shippers = new List<Shipper>(){
            new(){
                Id = 1,
                CompanyName = "Personal Collection",
                ContactFirstName = "-",
                ContactLastName = "-",
                Phone = "-",
                Email = "-",
                Price = 0,
                Disabled = false,
            },
            new(){
                Id = 2,
                CompanyName = "Hungarian Post",
                ContactFirstName = "Béla",
                ContactLastName = "Tóth",
                Phone = "+36556667777",
                Email = "contact@hungarianpost.com",
                Price = 9.99m,
                Disabled = false,
            },
            new(){
                Id = 3,
                CompanyName = "FedEx courier",
                ContactFirstName = "John",
                ContactLastName = "Doe",
                Phone = "+36557778888",
                Email = "fedex@fedexeu.com",
                Price = 14.99m,
                Disabled = false,
            },
            new(){
                Id = 4,
                CompanyName = "GLS courier",
                ContactFirstName = "Jane",
                ContactLastName = "Smith",
                Phone = "+36558889999",
                Email = "contact@glseu.com",
                Price = 18.99m,
                Disabled = true,
            },
            };
        context.AddRangeAsync(shippers);
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Shippers ON");
        context.SaveChanges();
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Shippers OFF");
        context.SaveChanges();
        #endregion

        #region Suppliers
        var suppliers = new List<Supplier>(){
            new(){
                Id = 1,
                CompanyName = "Acme Corp.",
                ContactFirstName = "Jane",
                ContactLastName = "Doe",
                Phone = "+36301111114",
                Email = "supplier1@example.com",
                Address = context.Addresses.Where(x => x.Id == 11).First(),
            },
            new(){
                Id = 2,
                CompanyName = "Gizmo Inc.",
                ContactFirstName = "Mike",
                ContactLastName = "Williams",
                Phone = "+36301111115",
                Email = "supplier2@example.com",
                Address = context.Addresses.Where(x => x.Id == 12).First(),
            },
            new(){
                Id = 3,
                CompanyName = "Widgets R Us",
                ContactFirstName = "Jane",
                ContactLastName = "Doe",
                Phone = "+36301111116",
                Email = "supplier3@example.com",
                Address = context.Addresses.Where(x => x.Id == 13).First(),
            },
            new(){
                Id = 4,
                CompanyName = "Shady Bt.",
                ContactFirstName = "Geza",
                ContactLastName = "Kovács",
                Phone = "+36301111117",
                Email = "supplier4@example.com",
                Address = context.Addresses.Where(x => x.Id == 14).First(),
            },

        };
        context.AddRangeAsync(suppliers);
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Suppliers ON");
        context.SaveChanges();
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Suppliers OFF");
        context.SaveChanges();
        #endregion

        #region Users
        var users = new List<User>(){
            new(){
                Id = 1,
                Username = "Admin",
                FirstName = "Root",
                LastName = "User",
                Email = "admin@itwebshop.hu",
                Phone = "+36554445555",
                Password = BCrypt.Net.BCrypt.HashPassword("password"),
                IsAdmin = true,
                Address = context.Addresses.Where(x => x.Id == 1).First(),
            },
            new(){
                Id = 2,
                Username = "JaneDoe",
                FirstName = "Jane",
                LastName = "Doe",
                Email = "jane.doe@gmail.com",
                Phone = "+36551112222",
                Password = BCrypt.Net.BCrypt.HashPassword("password"),
                IsAdmin = false,
                Address = context.Addresses.Where(x => x.Id == 2).First(),
            },
            new(){
                Id = 3,
                Username = "JohnDoe",
                FirstName = "John",
                LastName = "Doe",
                Email = "john.doe@gmail.com",
                Phone = "+36552221111",
                Password = BCrypt.Net.BCrypt.HashPassword("password"),
                IsAdmin = false,
                Address = context.Addresses.Where(x => x.Id == 3).First(),
            },
            new(){
                Id = 4,
                Username = "mike_brown",
                FirstName = "Mike",
                LastName = "Brown",
                Email = "mikebrown@gmail.com",
                Phone = "+36551113333",
                Password = BCrypt.Net.BCrypt.HashPassword("password"),
                IsAdmin = false,
                Address = context.Addresses.Where(x => x.Id == 4).First(),
            },
            new(){
                Id = 5,
                Username = "mike",
                FirstName = "Mike",
                LastName = "Jones",
                Email = "mikej@gmail.com",
                Phone = "+36551234561",
                Password = BCrypt.Net.BCrypt.HashPassword("password"),
                IsAdmin = false,
                Address = context.Addresses.Where(x => x.Id == 5).First(),
            },
        };
        context.AddRangeAsync(users);
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Users ON");
        context.SaveChanges();
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Users OFF");
        context.SaveChanges();
        #endregion

        #region Products
        var products = new List<Product>(){
            new(){
                Id = 1,
                Category = context.ProductCategories.Where(x => x.Id == 6).First(),
                Title = "ASUS ROG Maximus XII",
                Description = "High-performance motherboard for gaming PCs",
                BasePrice = 149.99m,
                Stock = 10,
                Discount = 0,
                Featured = false,
                Discontinued = true,
            },
            new(){
                Id = 2,
                Category = context.ProductCategories.Where(x => x.Id == 1).First(),
                Title = "Corsair Obsidian 500D",
                Description = "Mid-tower ATX case with tempered glass side panel",
                BasePrice = 99.99m,
                Stock = 15,
                Discount = 0,
                Featured = false,
                Discontinued = true,
            },
            new(){
                Id = 3,
                Category = context.ProductCategories.Where(x => x.Id == 9).First(),
                Title = "NVIDIA GeForce RTX 3080",
                Description = "High-end graphics card for gaming and content creation",
                BasePrice = 499.99m,
                Stock = 5,
                Discount = 0,
                Featured = true,
                Discontinued = false,
            },
            new(){
                Id = 4,
                Category = context.ProductCategories.Where(x => x.Id == 7).First(),
                Title = "Seasonic Focus Plus 750W",
                Description = "80+ Gold rated power supply for high-performance PCs",
                BasePrice = 79.99m,
                Stock = 20,
                Discount = 0,
                Featured = true,
                Discontinued = false,
            },
            new(){
                Id = 5,
                Category = context.ProductCategories.Where(x => x.Id == 5).First(),
                Title = "Corsair Vengeance LPX 16GB",
                Description = "DDR4 memory kit for high-performance PCs",
                BasePrice = 44.99m,
                Stock = 25,
                Discount = 0,
                Featured = true,
                Discontinued = false,
            },
            new(){
                Id = 6,
                Category = context.ProductCategories.Where(x => x.Id == 2).First(),
                Title = "Cooler Master Hyper 212 EVO",
                Description = "CPU cooler with 120mm fan",
                BasePrice = 44.99m,
                Stock = 30,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 7,
                Category = context.ProductCategories.Where(x => x.Id == 8).First(),
                Title = "Samsung 860 EVO 1TB",
                Description = "Solid-state drive for fast boot and load times",
                BasePrice = 129.99m,
                Stock = 20,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 8,
                Category = context.ProductCategories.Where(x => x.Id == 4).First(),
                Title = "Seagate Barracuda 1TB",
                Description = "Hard disk drive for ample storage",
                BasePrice = 49.99m,
                Stock = 25,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 9,
                Category = context.ProductCategories.Where(x => x.Id == 3).First(),
                Title = "Intel Core i9-11900K",
                Description = "High-performance CPU for gaming and content creation",
                BasePrice = 399.99m,
                Stock = 10,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 10,
                Category = context.ProductCategories.Where(x => x.Id == 6).First(),
                Title = "Gigabyte Aorus X570 Elite",
                Description = "High-performance motherboard for gaming and content creation",
                BasePrice = 129.99m,
                Stock = 8,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 11,
                Category = context.ProductCategories.Where(x => x.Id == 6).First(),
                Title = "ASUS ROG Maximus XII Apex",
                Description = "High-end motherboard for overclockers and enthusiasts",
                BasePrice = 199.99m,
                Stock = 6,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 12,
                Category = context.ProductCategories.Where(x => x.Id == 1).First(),
                Title = "NZXT H510 Elite",
                Description = "Mid-tower ATX case with tempered glass side panel",
                BasePrice = 89.99m,
                Stock = 12,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 13,
                Category = context.ProductCategories.Where(x => x.Id == 1).First(),
                Title = "Lian Li PC-O11 Dynamic XL R2",
                Description = "E-ATX case with tempered glass side panel and multiple fan mount options",
                BasePrice = 149.99m,
                Stock = 10,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 14,
                Category = context.ProductCategories.Where(x => x.Id == 1).First(),
                Title = "AMD Radeon RX 6900 XT",
                Description = "High-end graphics card for gaming and content creation",
                BasePrice = 149.99m,
                Stock = 7,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 15,
                Category = context.ProductCategories.Where(x => x.Id == 9).First(),
                Title = "NVIDIA GeForce RTX 3070",
                Description = "High-performance graphics card for gaming and content creation",
                BasePrice = 319.99m,
                Stock = 9,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 16,
                Category = context.ProductCategories.Where(x => x.Id == 7).First(),
                Title = "EVGA 500W 80+ Bronze",
                Description = "Power supply for budget-friendly builds",
                BasePrice = 59.99m,
                Stock = 15,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 17,
                Category = context.ProductCategories.Where(x => x.Id == 7).First(),
                Title = "Seasonic FOCUS Plus 550W",
                Description = "80+ Gold rated power supply for high-performance PCs",
                BasePrice = 89.99m,
                Stock = 25,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 18,
                Category = context.ProductCategories.Where(x => x.Id == 5).First(),
                Title = "Crucial Ballistix Sport 8GB",
                Description = "DDR4 memory kit for budget-friendly builds",
                BasePrice = 34.99m,
                Stock = 20,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 19,
                Category = context.ProductCategories.Where(x => x.Id == 5).First(),
                Title = "G.Skill Ripjaws V 16GB",
                Description = "DDR4 memory kit for high-performance PCs",
                BasePrice = 64.99m,
                Stock = 18,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 20,
                Category = context.ProductCategories.Where(x => x.Id == 2).First(),
                Title = "Cooler Master Hyper T4",
                Description = "CPU cooler with 92mm fan",
                BasePrice = 29.99m,
                Stock = 25,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 21,
                Category = context.ProductCategories.Where(x => x.Id == 2).First(),
                Title = "Noctua NH-D15",
                Description = "High-performance CPU cooler with dual 140mm fans",
                BasePrice = 49.99m,
                Stock = 15,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 22,
                Category = context.ProductCategories.Where(x => x.Id == 8).First(),
                Title = "Crucial MX500 1TB",
                Description = "High-performance solid-state drive",
                BasePrice = 99.99m,
                Stock = 30,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 23,
                Category = context.ProductCategories.Where(x => x.Id == 8).First(),
                Title = "Samsung 980 PRO 1TB",
                Description = "High-performance solid-state drive for enthusiasts",
                BasePrice = 199.99m,
                Stock = 15,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 24,
                Category = context.ProductCategories.Where(x => x.Id == 4).First(),
                Title = "Toshiba P300 2TB",
                Description = "High-capacity hard disk drive for ample storage",
                BasePrice = 39.99m,
                Stock = 20,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 25,
                Category = context.ProductCategories.Where(x => x.Id == 4).First(),
                Title = "Seagate IronWolf 4TB",
                Description = "Hard disk drive for high-performance NAS systems",
                BasePrice = 59.99m,
                Stock = 15,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 26,
                Category = context.ProductCategories.Where(x => x.Id == 3).First(),
                Title = "AMD Ryzen 9 5900X",
                Description = "High-performance CPU for gaming and content creation",
                BasePrice = 299.99m,
                Stock = 12,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 27,
                Category = context.ProductCategories.Where(x => x.Id == 3).First(),
                Title = "Intel Core i7-11700K",
                Description = "High-performance CPU for gaming and content creation",
                BasePrice = 329.99m,
                Stock = 14,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 28,
                Category = context.ProductCategories.Where(x => x.Id == 3).First(),
                Title = "ASRock Z490 Phantom Gaming",
                Description = "High-performance motherboard for gaming and content creation",
                BasePrice = 179.99m,
                Stock = 12,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 29,
                Category = context.ProductCategories.Where(x => x.Id == 1).First(),
                Title = "Thermaltake View 71 RGB",
                Description = "Full Tower case with Tempered Glass Window",
                BasePrice = 79.99m,
                Stock = 10,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },
            new(){
                Id = 30,
                Category = context.ProductCategories.Where(x => x.Id == 1).First(),
                Title = "AMD Radeon RX 6800 XT",
                Description = "Full Tower case with Tempered Glass Window",
                BasePrice = 599.99m,
                Stock = 5,
                Discount = 0,
                Featured = false,
                Discontinued = false,
            },

        };
        context.AddRangeAsync(products);
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Products ON");
        context.SaveChanges();
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Products OFF");
        context.SaveChanges();
        #endregion

        #region OrderAddresses
        var ordersAddresses = new List<OrderAddress>(){
            new(){
            Id = 1,
            Street = "62 Amoth Trail",
            City = "Sopron",
            Region = "Győr-Moson-Sopron",
            PostalCode = "9404",
            CountryWithVat = countriesWithVat[9],
            },
        };
        context.AddRangeAsync(ordersAddresses);
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT OrderAddresses ON");
        context.SaveChanges();
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT OrderAddresses OFF");
        context.SaveChanges();
        #endregion

        #region Orders
        var orders = new List<Order>(){
            new(){
                Id = 1,
                User = context.Users.Where(x => x.Id == 2).First(),
                Shipper = context.Shippers.Where(x => x.Id == 2).First(),
                OrderAddress = context.OrderAddresses.Where(x => x.Id == 1).First(),
                Status = OrderStatus.Fulfilled
            },
        };
        context.AddRangeAsync(orders);
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Orders ON");
        context.SaveChanges();
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Orders OFF");
        context.SaveChanges();
        #endregion

        #region ProductOrders
        var productOrders = new List<ProductOrder>(){
            new(){
                Id = 1,
                Product = context.Products.Where(x => x.Id == 1).First(),
                Order = context.Orders.Where(x => x.Id == 1).First(),
                BasePrice = context.Products.Where(x => x.Id == 1).First().BasePrice,
                Quantity = 2,
                Discount = 0,
            },
            new(){
                Id = 2,
                Product = context.Products.Where(x => x.Id == 2).First(),
                Order = context.Orders.Where(x => x.Id == 1).First(),
                BasePrice = context.Products.Where(x => x.Id == 2).First().BasePrice,
                Quantity = 3,
                Discount = 0,
            },
        };
        context.AddRangeAsync(productOrders);
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT ProductOrders ON");
        context.SaveChanges();
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT ProductOrders OFF");
        context.SaveChanges();
        #endregion

        #region ProductSuppliers
        var productSuppliers = new List<ProductSupplier>(){
            new(){
                Id= 1,
                Product = context.Products.Where(x => x.Id == 3).First(),
                Supplier = context.Suppliers.Where(x => x.Id == 1).First(),
                PurchasePrice = 450,
            },
            new(){
                Id= 2,
                Product = context.Products.Where(x => x.Id == 4).First(),
                Supplier = context.Suppliers.Where(x => x.Id == 1).First(),
                PurchasePrice = 60,
            }
        };
        context.AddRangeAsync(productSuppliers);
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT ProductSuppliers ON");
        context.SaveChanges();
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT ProductSuppliers OFF");
        context.SaveChanges();
        #endregion

        #region ProductReviews
        var productReviews = new List<ProductReview>(){
            new(){
                Id = 1,
                User = context.Users.Where(x => x.Id == 2).First(),
                Product = context.Products.Where(x => x.Id == 3).First(),
                Score = 5,
                Text = "Great Product!"
            },
            new(){
                Id = 2,
                User = context.Users.Where(x => x.Id == 3).First(),
                Product = context.Products.Where(x => x.Id == 3).First(),
                Score = 4,
                Text = "Not Bad."
            },
            new(){
                Id = 3,
                User = context.Users.Where(x => x.Id == 3).First(),
                Product = context.Products.Where(x => x.Id == 4).First(),
                Score = 3,
                Text = "Mediocre."
            },
            new(){
                Id = 4,
                User = context.Users.Where(x => x.Id == 2).First(),
                Product = context.Products.Where(x => x.Id == 4).First(),
                Score = 3,
                Text = "Do not buy."
            },
        };
        context.AddRangeAsync(productReviews);
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT ProductReviews ON");
        context.SaveChanges();
        context.Database.OpenConnection();
        context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT ProductReviews OFF");
        context.SaveChanges();
        #endregion

    }
}