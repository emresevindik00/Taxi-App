using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface ITaxiService
    {
        List<Taxi> getTaxis();
        List<Taxi> getTaxisBetween(int from, int to, int id);
        List<Taxi> getLastHalfHour(int id);
        Taxi addTaxi(Taxi taxi);
        List<Taxi> getByVehicleId(int id);
        void addToDb();
    }
}
