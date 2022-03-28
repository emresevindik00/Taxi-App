import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navi from "../layouts/Navi";

const MapById = () => {
  let { id } = useParams();
  const [hourFrom, sethourFrom] = useState();
  const [hourTo, sethourTo] = useState();
  const [coordinates, setcoordinates] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(
        `https://localhost:44358/api/Taxis/getBetween?from=${hourFrom}&to=${hourTo}&id=${id}`
      )
      .then((res) => {
        console.log(res.data);
        setcoordinates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const markerIcon = new L.Icon({
    iconUrl: require(".//marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });

  return (
    <div>
      <Navi/>
      <form onSubmit={handleSubmit} style={{ marginTop: "60px" }}>
        <div className="form-group" style={{ marginLeft: "600px" }}>
          <label>İlk Saat</label>
          <input
            style={{ width: "350px" }}
            className="form-control"
            type="text"
            onChange={(e) => sethourFrom(e.target.value)}
          />
        </div>

        <div
          className="form-group"
          style={{ marginTop: "20px", marginLeft: "600px" }}
        >
          <label>Son Saat</label>
          <input
            style={{ width: "350px" }}
            className="form-control"
            type="text"
            onChange={(e) => sethourTo(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary btn-block"
          style={{ marginTop: "30px", width: "200px", marginLeft: "680px" }}
        >
          Taksi Verilerini Getir
        </button>
      </form>
      <div style={{ marginTop: "100px" }}>
        <MapContainer
          className="markercluster-map"
          center={[59, 18]}
          zoom={10}
          style={{ width: "100vw", height: "100vh" }}
        >
          <TileLayer
            url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=aw1SILMH2x3TKdrSXS7q"
            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          />
          {coordinates.map((c) => (
            <Marker position={[c.lat, c.lon]} icon={markerIcon}>
                <Popup>
              <b>Latitude:</b> <br />
              <span>
                {c.lat}
              </span> <br />
              <b>Latitude:</b> <br />
              <span>
              {c.lon}
              </span>
              <br />
              <b>Date:</b> <br />
              <span></span>
              <spanb>{c.time}</spanb>
              <br />
              <b>ID: </b>
              <span>{c.vehicleID}</span>
            </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapById;
