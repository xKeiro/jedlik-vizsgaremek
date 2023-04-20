using backend.Enums;
using backend.Models;
using backend.Models.Products;
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

        if (context.Products.Any())
        {
            return;
        }
        #region Addresses
        var addresses = new List<Address>
        {
            new Address()
            {
                Street = "4 Almo Center",
                City = "Vienna",
                Region = "Lower Austria",
                PostalCode = "1011",
                Country = CountryCode.AT
            },
            new Address()
            {
                Street = "7019 La Follette Terrace",
                City = "Sopron",
                Region = "Győr-Moson-Sopron",
                PostalCode = "9404",
                Country = CountryCode.HU
            },
            new Address()
            {
                Street = "28 Birchwood Road",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1111",
                Country = CountryCode.HU
            },
            new Address()
            {
                Street = "8 Vahlen Park",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1046",
                Country = CountryCode.HU
            },
            new Address()
            {
                Street = "8588 Moose Point",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1086",
                Country = CountryCode.HU
            },
            new Address()
            {
                Street = "88 Springview Drive",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1097",
                Country = CountryCode.HU
            },
            new Address()
            {
                Street = "1770 Sachtjen Road",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1194",
                Country = CountryCode.HU
            },
            new Address()
            {
                Street = "88898 Londonderry Street",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1158",
                Country = CountryCode.HU
            },
            new Address()
            {
                Street = "3686 Westridge Alley",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1239",
                Country = CountryCode.HU
            },
            new Address()
            {
                Street = "62 Amoth Trail",
                City = "Sopron",
                Region = "Győr-Moson-Sopron",
                PostalCode = "9404",
                Country = CountryCode.HU
            },
            new Address()
            {
                Street = "82849 Memorial Court",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1024",
                Country = CountryCode.HU
            },
            new Address()
            {
                Street = "61988 Duke Circle",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1122",
                Country = CountryCode.HU
            },
            new Address()
            {
                Street = "010 Ridgeview Lane",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1046",
                Country = CountryCode.HU
            },
            new Address()
            {
                Street = "6 Marcy Plaza",
                City = "Budapest",
                Region = "Budapest",
                PostalCode = "1111",
                Country = CountryCode.HU
            },
            new Address()
            {
                Street = "23 Rue de la République",
                City = "Paris",
                Region = "Île-de-France",
                PostalCode = "75001",
                Country = CountryCode.FR
            },

            new Address()
            {
                Street = "Ul. Kraszewskiego 12/4",
                City = "Warsaw",
                Region = "Mazowieckie",
                PostalCode = "00-123",
                Country = CountryCode.PL
            },

            new Address()
            {
                Street = "Calle de Alcalá 54",
                City = "Madrid",
                Region = "Madrid",
                PostalCode = "28014",
                Country = CountryCode.ES
            },

            new Address()
            {
                Street = "Viale Regina Margherita 6",
                City = "Rome",
                Region = "Lazio",
                PostalCode = "00198",
                Country = CountryCode.IT
            },

            new Address()
            {
                Street = "Karl-Marx-Allee 90",
                City = "Berlin",
                Region = "Berlin",
                PostalCode = "10243",
                Country = CountryCode.DE
            },
            new Address()
            {
                Street = "Strada Statale 16 Km 23",
                City = "Bari",
                Region = "Puglia",
                PostalCode = "70126",
                Country = CountryCode.IT
            },

            new Address()
            {
                Street = "Lange Voorhout 34",
                City = "The Hague",
                Region = "South Holland",
                PostalCode = "2514 EE",
                Country = CountryCode.NL
            },

            new Address()
            {
                Street = "Kungsgatan 37",
                City = "Stockholm",
                Region = "Stockholm",
                PostalCode = "111 56",
                Country = CountryCode.SE
            },

            new Address()
            {
                Street = "Rruga e Kavajës 153",
                City = "Viena",
                Region = "Viena",
                PostalCode = "1001",
                Country = CountryCode.AT
            },

            new Address()
            {
                Street = "Praça do Comércio 12",
                City = "Lisbon",
                Region = "Lisbon",
                PostalCode = "1100-148",
                Country = CountryCode.PT
            },
            new Address()
            {
                Street = "Boulevard du Jardin Exotique 7",
                City = "Aslova",
                Region = "Slva",
                PostalCode = "98000",
                Country = CountryCode.SK
            },

            new Address()
            {
                Street = "Karl-Liebknecht-Straße 3",
                City = "Leipzig",
                Region = "Saxony",
                PostalCode = "04107",
                Country = CountryCode.DE
            },

            new Address()
            {
                Street = "Avenue Louise 231",
                City = "Brussels",
                Region = "Brussels-Capital",
                PostalCode = "1050",
                Country = CountryCode.BE
            },

            new Address()
            {
                Street = "Paseo de la Castellana 259",
                City = "Madrid",
                Region = "Madrid",
                PostalCode = "28046",
                Country = CountryCode.ES
            },

            new Address()
            {
                Street = "Rue du Faubourg Saint-Honoré 55",
                City = "Paris",
                Region = "Île-de-France",
                PostalCode = "75008",
                Country = CountryCode.FR
            }
        };
        context.AddRangeAsync(addresses);
        #endregion Addresses
        #region
        var productCategories = new List<ProductCategory>()
        {
            new()
            {
                Title = "Motherboards",
                Description = "A motherboard (also called mainboard, main circuit board, mb, mboard, backplane board, base board, system board, logic board (only in Apple computers) or mobo) is the main printed circuit board (PCB) in general-purpose computers and other expandable systems"
            },
            new()
            {
            Title = "Towers",
            Description = "A computer case, also known as a computer chassis, is the enclosure that contains most of the components of a personal computer (usually excluding the display, keyboard, and mouse)"
            },
            new()
            {
            Title = "Video Cards",
            Description = "A graphics card (also called a video card, display card, graphics adapter, GPU, VGA card/VGA, video adapter, or display adapter) is an expansion card which generates a feed of output images to a display device, such as a computer monitor."
            },
            new()
            {
            Title = "Power Supplies",
            Description = "A power supply is an electrical device that supplies electric power to an electrical load. The main purpose of a power supply is to convert electric current from a source to the correct voltage, current, and frequency to power the load."
            },
            new()
            {
            Title = "Memory",
            Description = "In computing, memory is a device or system that is used to store information for immediate use in a computer or related computer hardware and digital electronic devices."
            },
            new()
            {
            Title = "Coolers",
            Description = "Computer cooling is required to remove the waste heat produced by computer components, to keep components within permissible operating temperature limits."
            },
            new()
            {
            Title = "SSDs",
            Description = "A solid-state drive (SSD) is a solid-state storage device that uses integrated circuit assemblies to store data persistently, typically using flash memory, and functioning as secondary storage in the hierarchy of computer storage."
            },
            new()
            {
            Title = "HDDs",
            Description = "A hard disk drive (HDD), hard disk, hard drive, or fixed disk is an electro-mechanical data storage device that stores and retrieves digital data using magnetic storage with one or more rigid rapidly rotating platters coated with magnetic material."
            },
            new()
            {
            Title = "CPUs",
            Description = "A central processing unit (CPU), also called a central processor, main processor or just processor, is the electronic circuitry that executes instructions comprising a computer program."
            }
        };
        context.AddRangeAsync(productCategories);
        #endregion
        #region Users
        #endregion
        context.SaveChanges();
    }
}