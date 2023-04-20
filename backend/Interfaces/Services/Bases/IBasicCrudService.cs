namespace backend.Interfaces.Services.Bases;

public interface IBasicCrudService<TResponseDto, TRequestDto>
    where TResponseDto : class
    where TRequestDto : class
{
    Task<List<TResponseDto>> GetAll();
    Task<TResponseDto> Add(TRequestDto requestDto);
    Task<TResponseDto?> Find(ulong id);
    Task<TResponseDto> Update(TResponseDto requestDto);
}
