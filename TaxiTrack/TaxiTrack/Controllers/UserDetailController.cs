using Business.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailController : ControllerBase
    {
        private IUserDetailService _userDetailService;

        public UserDetailController(IUserDetailService userDetailService)
        {
            _userDetailService = userDetailService;
        }

        [HttpGet("getTaxiByUsername")]
        public IActionResult GetAll(string username)
        {
            return Ok(_userDetailService.GetTaxisByUsername(username));
        }
    }
}
