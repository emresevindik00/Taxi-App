using Business.Abstract;
using Core.Abstract;
using Entities.Concrete;
using MongoDB.Bson;
using MongoDB.Driver;
using NetMQ;
using NetMQ.Sockets;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;

namespace Business.Concrete
{
    public class TaxiManager : ITaxiService
    {
        private readonly IMongoCollection<Taxi> _taxis;
        

        public TaxiManager(IDbClient client)
        {
            _taxis = client.GetTaxisCollection();
        }

        public Taxi addTaxi(Taxi taxi)
        {
            _taxis.InsertOne(taxi);
            return taxi;
        }

        public void addToDb()
        {
            CultureInfo customCulture = (CultureInfo)Thread.CurrentThread.CurrentCulture.Clone();
            customCulture.NumberFormat.NumberDecimalSeparator = ".";

            Thread.CurrentThread.CurrentCulture = customCulture;

            var lines = File.ReadAllLines(@"C:\Users\msi\Desktop\carss.csv");
            var list = new List<Taxi>();
            foreach (var line in lines)
            {
                var values = line.Split(',');
                var taxi = new Taxi()
                {
                    time = DateTime.ParseExact(values[0], "yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture),
                    lat = double.Parse(values[1]),
                    lon = double.Parse(values[2]),
                    vehicleID = int.Parse(values[3])

                };
                list.Add(taxi);
                _taxis.InsertOne(taxi);
            }
            list.ForEach(x => System.Diagnostics.Debug.WriteLine($"{x.time}\t {x.lon} \t {x.lat}\t {x.vehicleID}"));
        }

        public List<Taxi> getByVehicleId(int id)
        {
            return _taxis.AsQueryable().Where(x => x.vehicleID == id).ToList();
        }

        public List<Taxi> getLastHalfHour(int id)
        {
            DateTime dt = new DateTime(2018, 10, 10, DateTime.Now.Hour, DateTime.Now.Minute, 0);
            
            /*var dateQuery = new BsonDocument
            {
                
                 {"time" , new BsonDocument {
                    { "$gt" , dt.AddMinutes(-30)}
                }}
            };*/

            //return _taxis.Find(dateQuery).ToList().Where(x => x.vehicleID == id).ToList();

            return _taxis.AsQueryable()
                .Where(x => x.time > dt.AddMinutes(-30) && x.time < dt.AddMinutes(0))
                .Where(x => x.vehicleID == id)
                .ToList();
        }

        public List<Taxi> getTaxis()
        {
            return _taxis.AsQueryable().Select(x => x).ToList();
        }

        public List<Taxi> getTaxisBetween(int from, int to, int id)
        {
            DateTime dtFrom = new DateTime(2018, 10, 10, 0, 0, 0);
            DateTime dtTo = new DateTime(2018, 10, 10, 0, 0, 0);
            return _taxis.AsQueryable()
                .Where(x => x.time > dtFrom.AddHours(from) && x.time < dtTo.AddHours(to))
                .Where(x => x.vehicleID == id)
                .ToList();
          

            /*return _taxis.AsQueryable()
                .Where(x =>
                x.time >= first
                && x.time <= second
                && (x.vehicleID == id
               || x.vehicleID == id2))
                .ToList();*/
            
        }
        //44358


    }
}
