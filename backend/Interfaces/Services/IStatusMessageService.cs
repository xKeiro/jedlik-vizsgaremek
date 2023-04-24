using backend.Models;

namespace backend.Interfaces.Services;
public interface IStatusMessageService
{
    StatusMessage AlreadyExists409<TModel>() where TModel : class;
    StatusMessage Deleted200<TModel>(ulong id) where TModel : class;
    StatusMessage NotFound404<TModel>(ulong id) where TModel : class;
    StatusMessage NotUnique409<TModel>(List<string> notUniquePropertiesName) where TModel : class;
    StatusMessage GenericError500();
    StatusMessage ANotExistingIdProvided404();
    StatusMessage ConfirmationPasswordMismatch400();
    StatusMessage DoesNotExist404(string nameOfNotExisting, string valueOfNotExisting);
    StatusMessage LoginFailed401();
    StatusMessage ProductCannotBeDiscontinuedAndFeaturedAtTheSameTime400();
    StatusMessage ProductDiscontinued200(ulong id);
}
