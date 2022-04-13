using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using peliculas_api.Context;
using peliculas_api.Models;
using System;
using System.Linq;

namespace peliculas_api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class FavoritoController : Controller
    {
        private readonly PeliculasDbContext context;
        public FavoritoController(PeliculasDbContext context)
        {
            this.context = context;
        }

        [Route("{idUsuario}")]
        [HttpGet]
        public ActionResult Get(int idUsuario)
        {
            try
            {
                return Ok(context.Favorito.Where(f => f.IdUsuario == idUsuario).Select(p => p.Pelicula));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpPost]
        public ActionResult Agregar([FromBody] Favorito favorito)
        {
            try
            {
                context.Favorito.Add(favorito);
                context.SaveChanges();
                return Ok(favorito);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpPost]
        public ActionResult Eliminar([FromBody] Favorito favorito)
        {
            try
            {
                context.Favorito.Remove(favorito);
                context.SaveChanges();
                return Ok(favorito);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
