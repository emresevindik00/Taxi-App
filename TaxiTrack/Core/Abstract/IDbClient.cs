using Entities.Concrete;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Abstract
{
    public interface IDbClient
    {
        IMongoCollection<Taxi> GetTaxisCollection();
    }
}
