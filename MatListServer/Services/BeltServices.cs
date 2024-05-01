using DBContext;
using Microsoft.AspNetCore.Http.HttpResults;
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
    public async Task<Belt> UpdateBelt(Belt belt)
    {
        var obj = await _context.Belt.Where(x => x.Id == belt.Id).FirstOrDefaultAsync();
        if (obj == null) return null;
        obj.Size = belt.Size;
        obj.Type = belt.Type;
        obj.Quantity = belt.Quantity;
        await _context.SaveChangesAsync();
        return obj;
    }
}