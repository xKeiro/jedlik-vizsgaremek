using backend.Interfaces.Services;
using backend.Models;
using System.Text;

namespace backend.Services;

public class StatusMessageService<TModel> : IStatusMessageService where TModel : class
{
    public StatusMessage AlreadyExists() => new()
    {
        Message = $"{typeof(TModel).Name} already exists!",
        StatusCode = StatusCodes.Status409Conflict
    };

    public StatusMessage NotFound(ulong id) => new()
    {
        Message = $"{typeof(TModel).Name} with Id:'{id}' does not exist!",
        StatusCode = StatusCodes.Status404NotFound
    };

    public StatusMessage Deleted(ulong id) => new()
    {
        Message = $"{typeof(TModel).Name} with id:'{id}' was deleted and everything related to it!",
        StatusCode = StatusCodes.Status200OK
    };

    public StatusMessage NotUnique(List<string> notUniquePropertiesName)
    {
        var sb = new StringBuilder()
            .Append($"The ")
            .AppendJoin(", ", notUniquePropertiesName)
            .Append($" of {typeof(TModel).Name} should be unique!");

        return new()
        {
            Message = sb.ToString(),
            StatusCode = StatusCodes.Status409Conflict
        };
    }

    public StatusMessage GenericError() => new()
    {
        Message = "Internal server error occurred!",
        StatusCode = StatusCodes.Status500InternalServerError
    };

    public StatusMessage ANotExistingIdProvided() => new()
    {
        Message = "At least one Id was provided that does not exist in our system!",
        StatusCode = StatusCodes.Status404NotFound
    };
}
