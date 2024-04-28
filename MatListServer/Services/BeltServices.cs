using DBContext;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Services;
class BeltsServices
{
    private readonly MatListContext _context = new();
    public async Task InserteBeltAsync(Belt belt)
    {

        _context.Database.EnsureCreated();

        _context.Add(belt);
        await _context.SaveChangesAsync();
    }
    public async Task DeleteAsync(Belt belt)
    {
        _context.Remove(belt);
        await _context.SaveChangesAsync();
    }
    public async Task<Belt> GetByIdAsync(int id)
    {
        var obj = await _context.Belt.FindAsync(id);
        if (obj == null) return null;
        return obj;
    }
    public async Task<List<Belt>> GetAllBeltAsync()
    {
        return await _context.Belt.ToListAsync();
    }
}