using SixLabors.ImageSharp.Web.Commands;
using SixLabors.ImageSharp.Web.DependencyInjection;
using SixLabors.ImageSharp.Web.Processors;
using SixLabors.ImageSharp.Web.Providers;

namespace backend.Extensions;

public static class ImageSharpConfiguration
{
    public static void ConfigureImageSharp(this IServiceCollection services) => services.AddImageSharp(options =>
    {
        options.Configuration = Configuration.Default;
        options.OnParseCommandsAsync = c =>
        {
            if (c.Commands.Count == 0)
            {
                return Task.CompletedTask;
            }

            uint width = c.Parser.ParseValue<uint>(
            c.Commands.GetValueOrDefault(ResizeWebProcessor.Width),
            c.Culture);

            uint height = c.Parser.ParseValue<uint>(
                c.Commands.GetValueOrDefault(ResizeWebProcessor.Height),
                c.Culture);

            if (width > 4000 && height > 4000)
            {
                c.Commands.Remove(ResizeWebProcessor.Width);
                c.Commands.Remove(ResizeWebProcessor.Height);
            }
            return Task.CompletedTask;
        };
    });
}
