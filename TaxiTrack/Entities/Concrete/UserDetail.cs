using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;


namespace Entities.Concrete
{
    
    public class UserDetail
    {
        public int id { get; set; }
        public string username { get; set; }
        public int vehicleID { get; set; }
    }
}
