using backend.Models;

namespace backend.Interfaces.Services;
public interface IStatusMessageService
{
    StatusMessage AlreadyExists409<TModel>() where TModel : class;
    StatusMessage Deleted200<TModel>(ulong id) where TModel : class;
    StatusMessage NotFound404<TModel>(ulong id) where TModel : class;
    StatusMessage NotFound404<TModel>() where TModel : class;
    StatusMessage NotUnique409<TModel>(List<string> notUniquePropertiesName) where TModel : class;
    StatusMessage GenericError500();
    StatusMessage ANotExistingIdProvided404();
    StatusMessage ConfirmationPasswordMismatch400();
    StatusMessage DoesNotExist404(string nameOfNotExisting, string valueOfNotExisting);
    StatusMessage LoginFailed401();
    StatusMessage ProductCannotBeDiscontinuedAndFeaturedAtTheSameTime400();
    StatusMessage ProductDiscontinued200(ulong id);
    StatusMessage UserAlreadyHaveAReview409(string username, string productTitle);
    StatusMessage ProductAlreadyHaveThisSupplierRegistered409(ulong productId, ulong supplierId);
    StatusMessage WrongImageType400(string[] allowed_image_types);
}
