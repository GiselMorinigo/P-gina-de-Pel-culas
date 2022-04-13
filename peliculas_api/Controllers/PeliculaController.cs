using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using peliculas_api.Context;
using peliculas_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace peliculas_api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class PeliculaController : Controller
    {
        private readonly PeliculasDbContext context;
        public PeliculaController(PeliculasDbContext context)
        {
            this.context = context;
        }
        // GET: api/<controller>

        [Route("{idUsuario}")]
        [HttpGet]
        public ActionResult Get(int idUsuario)
        {
            try
            {

                return Ok(context.Pelicula.Select(p =>
                            new {
                                p.IdPelicula,
                                p.Titulo,
                                p.Anio,
                                p.Duracion,
                                p.Genero,
                                p.Director,
                                p.Actores,
                                p.Sinopsis,
                                p.Portada,
                                p.Estrellas,
                                p.Precio,
                                favorito = p.Favorito.Where(f => f.IdUsuario == idUsuario).Select(fa =>
                                                new { fa.IdPelicula }),
                                carrito = p.Carrito.Where(c => c.IdUsuario == idUsuario).Select(ca =>
                                                new { ca.IdPelicula })
                            }).ToList());




            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<controller>/5
        [Route("[action]/{idUsuario}/{valor}")]
        [HttpGet("BuscarPor")]
        public ActionResult BuscarPor(int idUsuario, string valor)
        {
            try
            {
                return Ok(context.Pelicula.Select(p =>
                            new {
                                p.IdPelicula,
                                p.Titulo,
                                p.Anio,
                                p.Duracion,
                                p.Genero,
                                p.Director,
                                p.Actores,
                                p.Sinopsis,
                                p.Portada,
                                p.Estrellas,
                                p.Precio,
                                favorito = p.Favorito.Where(f => f.IdUsuario == idUsuario).Select(fa =>
                                                new { fa.IdPelicula, fa.IdUsuario }),
                                carrito = p.Carrito.Where(c => c.IdUsuario == idUsuario).Select(ca =>
                                                new { ca.IdPelicula })
                            }).Where(p => p.Genero.Contains(valor) ||
                                    p.Titulo.Contains(valor) ||
                                    p.Director.Contains(valor) ||
                                    p.Actores.Contains(valor) ||
                                    p.Genero.Contains(valor)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<controller>/5
        [Route("[action]/{idUsuario}/{estrellas}")]
        [HttpGet("GetDestacadas")]
        [AllowAnonymous]
        public ActionResult GetDestacadas(int idUsuario, int estrellas)
        {
            try
            {
                return Ok(context.Pelicula.Select(p =>
                            new {
                                p.IdPelicula,
                                p.Titulo,
                                p.Anio,
                                p.Duracion,
                                p.Genero,
                                p.Director,
                                p.Actores,
                                p.Sinopsis,
                                p.Portada,
                                p.Estrellas,
                                p.Precio,
                                favorito = p.Favorito.Where(f => f.IdUsuario == idUsuario).Select(fa =>
                                                new { fa.IdPelicula, fa.IdUsuario }),
                                carrito = p.Carrito.Where(c => c.IdUsuario == idUsuario).Select(ca =>
                                                new { ca.IdPelicula }),
                            }).Where(p => p.Estrellas >= estrellas));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
