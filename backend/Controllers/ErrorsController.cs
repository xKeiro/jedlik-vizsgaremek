using backend.Interfaces.Services;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class ErrorsController : ApiControllerBase
{
    private readonly IStatusMessageService _statusMessage;

    public ErrorsController(IStatusMessageService statusMessage)
    {
        _statusMessage = statusMessage;
    }

    [Route("/Error")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public IActionResult Error() => Problem(_statusMessage.GenericError());
}
