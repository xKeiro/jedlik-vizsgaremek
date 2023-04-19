using backend.Models;

namespace backend.Interfaces.Services;
public interface IStatusMessageService
{
    StatusMessage AlreadyExists();
    StatusMessage Deleted(ulong id);
    StatusMessage NoneFound();
    StatusMessage NotFound(ulong id);
    StatusMessage NotUnique();
    StatusMessage GenericError();
    StatusMessage ANotExistingIdProvided();
}
