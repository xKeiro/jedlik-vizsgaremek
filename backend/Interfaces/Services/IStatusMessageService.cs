using backend.Models;

namespace backend.Interfaces.Services;
public interface IStatusMessageService
{
    StatusMessage AlreadyExists<TModel>() where TModel : class;
    StatusMessage Deleted<TModel>(ulong id) where TModel : class;
    StatusMessage NotFound<TModel>(ulong id) where TModel : class;
    StatusMessage NotUnique<TModel>(List<string> notUniquePropertiesName) where TModel : class;
    StatusMessage GenericError();
    StatusMessage ANotExistingIdProvided();
    StatusMessage ConfirmationPasswordMismatch();
}
