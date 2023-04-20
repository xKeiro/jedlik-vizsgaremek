using backend.Models;

namespace backend.Interfaces.Services;
public interface IStatusMessageService
{
    StatusMessage AlreadyExists();
    StatusMessage Deleted(ulong id);
    StatusMessage NotFound(ulong id);
    StatusMessage NotUnique(List<string> notUniquePropertiesName);
    StatusMessage GenericError();
    StatusMessage ANotExistingIdProvided();
}
