using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Runtime.Serialization;
using System.Text;

namespace Entities.Concrete
{
    public class Taxi
    {

        public Taxi()
        {
            _id = ObjectId.GenerateNewId();
        }

        [BsonId]
        [DataMember]
        [JsonIgnore]
        public ObjectId _id { get; set; }
        public int vehicleID { get; set; }

        public double lat { get; set; }
        public double lon { get; set; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]

        public DateTime time { get; set; }

    }
}
