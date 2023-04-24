using AutoMapper;
using backend.Maps;

namespace backend_tests.Utils;

public static class MapperHelper
{
    public static IMapper GetMapper()
    {
        var mappingConfig = new MapperConfiguration(mc => mc.AddProfile(typeof(MappingProfile)));
        return mappingConfig.CreateMapper();
    }
}