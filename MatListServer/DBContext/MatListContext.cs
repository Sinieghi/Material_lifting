using Microsoft.EntityFrameworkCore;
using Model;

namespace DBContext;

class MatListContext : DbContext
{
    public DbSet<Belt> Belt { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptions)
    {
        URL dbLink = new();
        dbContextOptions.UseMySQL(dbLink.url);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Belt>(entity =>
        {
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Type);
            entity.Property(x => x.Size);
        });
    }
}


