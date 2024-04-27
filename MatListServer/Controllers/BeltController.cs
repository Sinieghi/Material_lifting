using Microsoft.AspNetCore.Mvc;
using Model;
using Services;
namespace Controller;
class BeltController() : ControllerBase
{
    private readonly BeltsServices _belt = new();

    public async Task<List<Belt>> GetBeltList()
    {
        return await _belt.GetAllBeltAsync();
    }
    public async Task InserteBelt(Belt belt)
    {
        await _belt.InserteBeltAsync(belt);
    }
    public async Task<Belt> GetBeltAsync(int id)
    {
        return await _belt.GetByIdAsync(id);
    }
    public async Task DeleteAsync(int id)
    {
        await _belt.DeleteAsync(await _belt.GetByIdAsync(id));
    }
}