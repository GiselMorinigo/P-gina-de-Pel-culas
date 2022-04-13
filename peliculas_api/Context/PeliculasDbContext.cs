using Microsoft.EntityFrameworkCore;
using peliculas_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace peliculas_api.Context
{
    public class PeliculasDbContext : DbContext
    {
        public PeliculasDbContext(DbContextOptions<PeliculasDbContext> options) : base(options)
        {

        }

        public DbSet<Pelicula> Pelicula { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Favorito> Favorito { get; set; }
        public DbSet<Carrito> Carrito { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Favorito>().HasKey(x => new { x.IdUsuario, x.IdPelicula });
            modelBuilder.Entity<Favorito>().HasOne(x => x.Usuario)
                .WithMany(f => f.Favorito)
                .HasForeignKey(u => u.IdUsuario);

            modelBuilder.Entity<Favorito>().HasOne(x => x.Pelicula)
                .WithMany(f => f.Favorito)
                .HasForeignKey(f => f.IdPelicula);

            modelBuilder.Entity<Carrito>().HasKey(x => new { x.IdUsuario, x.IdPelicula });

            modelBuilder.Entity<Carrito>().HasOne(x => x.Usuario)
                .WithMany(f => f.Carrito)
                .HasForeignKey(u => u.IdUsuario);

            modelBuilder.Entity<Carrito>().HasOne(x => x.Pelicula)
                .WithMany(f => f.Carrito)
                .HasForeignKey(f => f.IdPelicula);
        }
    }
}
