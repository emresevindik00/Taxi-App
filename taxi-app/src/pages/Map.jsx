import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Navi from "../layouts/Navi";

const Home = () => {
  var decoded = jwt_decode(sessionStorage.getItem("token"));

  const [firstTaxiId, setfirstTaxiId] = useState();
  const [secondTaxiId, setsecondTaxiId] = useState();
  const [coordinates, setcoordinates] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://localhost:44358/api/UserDetail/getTaxiByUsername?username="+decoded.name
      )
      .then((res) => {
        console.log(res.data);
        setfirstTaxiId(res.data[0].vehicleID);
        setsecondTaxiId(res.data[1].vehicleID);
      })
  }, [decoded.name]);

  useEffect(() => {
    axios
      .get(
        "https://localhost:44358/api/Taxis/GetLastHalfMinute?id="+firstTaxiId
      )
      .then((res) => {
        console.log(res.data);
        setcoordinates(res.data);
      })
  }, [firstTaxiId]);

  useEffect(() => {
    axios
      .get(
        "https://localhost:44358/api/Taxis/GetLastHalfMinute?id="+secondTaxiId
      )
      .then((res) => {
        console.log(res.data);
        setcoordinates(...coordinates, res.data);
      })
  }, []);

  const markerIcon = new L.Icon({
    iconUrl: require(".//marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
  });

  return (
    <div>
      <Navi/>
    <div>
      <MapContainer
        className="markercluster-map"
        center={[59.36737693446465, 18.088961539795356]}
        zoom={100}
        style={{ width: "100vw", height: "100vh" }}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=aw1SILMH2x3TKdrSXS7q"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        {coordinates.map((c) => (
          <Marker position={[c.lat,c.lon]} icon={markerIcon}>
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
              <spanb>{c.time}</spanb> <br />
              <b>ID: </b>
              <span>{c.vehicleID}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
    
      {coordinates.map((c) => (
        <ul>
          <li>{c.lat}</li>
          <li>{c.lon}</li>
        </ul>
        
      ))}
    
    </div>
  );
};

export default Home;
