using Business.Abstract;
using DataAccess.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
       
        private IAuthService _authService;

        public AuthController(IAuthService authService)
        {
 
            _authService = authService;
        }

        [HttpPost]
        public IActionResult Login(UserLogin userLogin)
        {
            var user = _authService.Authenticate(userLogin);

            if (user != null)
            {
                var token = _authService.Generate(user);
                return Ok(token);
            }
            return NotFound("User not found");
        }

        
        
    }
}
