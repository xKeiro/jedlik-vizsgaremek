namespace backend.Interfaces.Services.Bases
{
    public interface IUniqueService<TResponseDto, TRequestDto>
        where TRequestDto : class
        where TResponseDto : class
    {
        Task<bool> IsUnique(TResponseDto requestDto);
        Task<bool> IsUnique(TRequestDto requestDto);
    }
}
