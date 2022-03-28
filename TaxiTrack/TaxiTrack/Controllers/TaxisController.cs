using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace TaxiTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaxisController : ControllerBase
    {
        private readonly ITaxiService _taxiService;

        

        public TaxisController(ITaxiService taxiService)
        {
            _taxiService = taxiService;
        }

        [HttpGet]
        public IActionResult GetTaxis()
        {
            _taxiService.addToDb();
            return Ok(_taxiService.getTaxis());
        }

        [HttpPost]
        public IActionResult AddTaxi(Taxi taxi)
        {
            return Ok(_taxiService.addTaxi(taxi));
        }

        [HttpGet("getBetween")]
        public IActionResult GetBetweenDate(int from, int to, int id)
        {
            return Ok(_taxiService.getTaxisBetween(from, to, id));
        }

        [HttpGet("GetLastHalfMinute")]
        public IActionResult GetLastHalfMinute(int id)
        {
            return Ok(_taxiService.getLastHalfHour(id));
        }

        [HttpGet("GetByVeihcleId")]
        public IActionResult GetByVeihcleId(int id)
        {
            
            return Ok(_taxiService.getByVehicleId(id));
        }

        
    }
}
