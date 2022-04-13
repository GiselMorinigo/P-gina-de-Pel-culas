using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using peliculas_api.Context;
using peliculas_api.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace peliculas_api.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class LoginController : Controller
    {
        private readonly PeliculasDbContext context;
        private readonly string keyValue;
        private readonly string issuer;
        private readonly int expirationTime;
        public LoginController(PeliculasDbContext context, IConfiguration config)
        {
            keyValue = config.GetSection("JWT_KEY").GetSection("key").Value.ToString();
            issuer = config.GetSection("JWT_KEY").GetSection("Issuer").Value.ToString();
            expirationTime = Int32.Parse(config.GetSection("JWT_KEY").GetSection("ExpirationTime").Value);
            this.context = context;
        }

        [HttpPost]
        [AllowAnonymous]

        public ActionResult Login([FromBody] Usuario usuario)
        {
            Usuario usuarioValido = context.Usuario.Where(u => u.Email == usuario.Email && u.Password == usuario.Password).FirstOrDefault();
            if (usuarioValido != null)
            {
                usuarioValido.Token = GetJWT(usuarioValido.Email);
            }
            return Ok(usuarioValido);
        }

        private string GetJWT(string email)
        {
            var jwtkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyValue));
            var secureId = new SigningCredentials(jwtkey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var tokenBody = new JwtSecurityToken(
                issuer: issuer,
                audience: issuer,
                claims,
                expires: DateTime.Now.AddMinutes(expirationTime),
                signingCredentials: secureId);

            var token = new JwtSecurityTokenHandler().WriteToken(tokenBody);
        
            return token;
        }

    }
}
