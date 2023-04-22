using AutoMapper;
using backend.Dtos.Users;
using backend.Interfaces.Services;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using OneOf;

namespace backend.Services;

public class UserService: IUserService
{
    private readonly JedlikContext _context;
    private readonly IMapper _mapper;
    private readonly IStatusMessageService _statusMessage;
    public UserService(JedlikContext context, IStatusMessageService statusMessage, IMapper mapper)
    {
        _context = context;
        _statusMessage = statusMessage;
        _mapper = mapper;
    }
    public async Task<OneOf<UserPublic, StatusMessage>> FindById(ulong userId)
    {
        var user = await _context.Users.FindAsync(userId);
        return user == null
            ? _statusMessage.NotFound<User>(userId)
            : _mapper.Map<User, UserPublic>(user);
    }
}
