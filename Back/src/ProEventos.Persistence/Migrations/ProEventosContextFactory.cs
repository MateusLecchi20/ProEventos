using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using ProEventos.Persistence.Contextos;

namespace ProEventos.Persistence
{
    public class ProEventosContextFactory : IDesignTimeDbContextFactory<ProEventosContext>
    {
        public ProEventosContext CreateDbContext(string[] args) 
        {
            var optionsBuilder = new DbContextOptionsBuilder<ProEventosContext>();

            optionsBuilder.UseSqlite("Data Source=ProEventos.db");

            return new ProEventosContext(optionsBuilder.Options);
        }
    }
}