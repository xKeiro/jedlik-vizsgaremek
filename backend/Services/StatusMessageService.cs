using backend.Interfaces.Services;
using backend.Models;
using System.Text;

namespace backend.Services;

public class StatusMessageService : IStatusMessageService
{
    public StatusMessage AlreadyExists<TModel>() where TModel : class 
        => new()
    {
        Message = $"{typeof(TModel).Name} already exists!",
        StatusCode = StatusCodes.Status409Conflict
    };

    public StatusMessage NotFound<TModel>(ulong id) where TModel : class 
        => new()
    {
        Message = $"{typeof(TModel).Name} with Id:'{id}' does not exist!",
        StatusCode = StatusCodes.Status404NotFound
    };

    public StatusMessage Deleted<TModel>(ulong id) where TModel : class
        => new()
    {
        Message = $"{typeof(TModel).Name} with id:'{id}' was deleted and everything related to it!",
        StatusCode = StatusCodes.Status200OK
    };

    public StatusMessage NotUnique<TModel>(List<string> notUniquePropertiesName) where TModel : class
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

    public StatusMessage ConfirmationPasswordMismatch() => new()
    {
        Message = "The confirmation password does not match the password!",
        StatusCode = StatusCodes.Status400BadRequest
    };
    public StatusMessage DoesNotExist(string nameOfNotExisting, string valueOfNotExisting) => new()
    {
        Message = $"{nameOfNotExisting} ({valueOfNotExisting}) does not exist in our database!",
        StatusCode = StatusCodes.Status404NotFound
    };
    public StatusMessage LoginFailed() => new()
    {
        Message = $"Authentication failed, please check your credentials!",
        StatusCode = StatusCodes.Status401Unauthorized
    };
    public StatusMessage ProductCannotBeDiscontinuedAndFeaturedAtTheSameTime() => new()
    {
        Message = "Product cannot be discontinued and featured at the same time!",
        StatusCode = StatusCodes.Status400BadRequest
    };
    public StatusMessage ProductDiscontinued(ulong id)
        => new()
        {
            Message = $"The product with id:'{id}' is now discontinued!",
            StatusCode = StatusCodes.Status200OK
        };
}
