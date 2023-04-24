using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
public class ApiControllerBase : ControllerBase
{
    protected ActionResult Problem(StatusMessage error) => Problem(error.Message, null, error.StatusCode);
    protected ActionResult Created(object obj) => StatusCode(StatusCodes.Status201Created, obj);
}