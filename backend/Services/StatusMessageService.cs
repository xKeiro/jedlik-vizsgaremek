using backend.Interfaces.Services;
using backend.Models;

namespace backend.Services;

public class StatusMessageService<TModel> : IStatusMessageService where TModel : class
{
    public StatusMessage NoneFound()
    {
        return new()
        {
            Message = $"No {typeof(TModel).Name}s found!"
        };
    }

    public StatusMessage AlreadyExists()
    {
        return new()
        {
            Message = $"{typeof(TModel).Name} already exists!"
        };
    }

    public StatusMessage NotFound(ulong id)
    {
        return new()
        {
            Message = $"{typeof(TModel).Name} with id:'{id}' doesn't exist!"
        };
    }

    public StatusMessage Deleted(ulong id)
    {
        return new()
        {
            Message = $"{typeof(TModel).Name} with id:'{id}' was deleted and everything related to it!"
        };
    }

    public StatusMessage NotUnique()
    {
        return new()
        {
            Message = $"{typeof(TModel).Name} has a property that is not unique, but should be!"
        };
    }

    public StatusMessage GenericError()
    {
        return new()
        {
            Message = "There was a problem!"
        };
    }

    public StatusMessage ANotExistingIdProvided()
    {
        return new()
        {
            Message = "At least one Id was provided that does not exist in our system!"
        };
    }
}
