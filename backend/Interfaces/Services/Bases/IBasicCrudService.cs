using backend.Models;
using OneOf;

namespace backend.Interfaces.Services.Bases;

public interface IBasicCrudService<TResponseDto, TRequestDto>
    where TResponseDto : class
    where TRequestDto : class
{
    Task<List<TResponseDto>> GetAll();
    Task<OneOf<TResponseDto, StatusMessage>> Add(TRequestDto requestDto);
    Task<OneOf<TResponseDto, StatusMessage>> Find(ulong id);
    Task<OneOf<TResponseDto, StatusMessage>> Update(TResponseDto requestDto);
}
