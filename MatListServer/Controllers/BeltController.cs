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
}