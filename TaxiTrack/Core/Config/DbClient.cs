using Core.Abstract;
using Entities.Concrete;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Config
{
    public class DbClient : IDbClient
    {
        private readonly IMongoCollection<Taxi> _taxis;
        public DbClient(IOptions<TaxiDbConfig> taxiDbConfig)
        {
            var client = new MongoClient(taxiDbConfig.Value.Connection_String);
            var database = client.GetDatabase(taxiDbConfig.Value.Database_Name);
            _taxis = database.GetCollection<Taxi>(taxiDbConfig.Value.Collection_Name);
        }
        public IMongoCollection<Taxi> GetTaxisCollection() => _taxis;
        
    }
}
