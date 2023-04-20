using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

public class ErrorsController : ApiControllerBase
{
    [Route("/Error")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public IActionResult Error() => Problem(new StatusMessage
    {
        Message = "An error occurred while processing your request.",
        StatusCode = StatusCodes.Status500InternalServerError
    });
}
