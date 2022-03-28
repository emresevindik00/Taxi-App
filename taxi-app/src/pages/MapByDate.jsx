import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Navi from "../layouts/Navi";

const MapByDate = () => {
  var decoded = jwt_decode(sessionStorage.getItem("token"));

  const [firstTime, setfirstTime] = useState({varOne:new Date()});
  const [secondTime, setsecondTime] = useState({varTwo:new Date()});
  const [id, setid] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      from: firstTime,
      to: secondTime,
      id: id,
    };

    axios
      .get(
        "https://localhost:44358/api/UserDetail/getTaxiByUsername?username=" +
          decoded.name
      )
      .then((res) => {
        setid(res.data[0].vehicleID);
      })
      .then(
        axios
          .get("https://localhost:44358/api/Taxis/getBetween", data)
          .then((res) => {
            console.log(res.data);
          })
      );
  };

  return (
    <div>
      <Navi/>
      <form onSubmit={handleSubmit} style={{ marginTop: "120px" }}>
        <div className="form-group" style={{ marginLeft: 600 }}>
          <label>İlk Tarih</label>
          <input
            type="text"
            name=""
            id=""
            style={{ width: 300 }}
            className="form-control"
            onChange={(e) => setfirstTime(e.target.value)}
          />
        </div>
        <div className="form-group" style={{ marginLeft: 600 }}>
          <label>İkinci Tarih</label>
          <input
            type="text"
            name=""
            id=""
            style={{ width: 300 }}
            className="form-control"
            onChange={(e) => setsecondTime(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary btn-block"
          style={{ marginTop: "30px", width: "200px", marginLeft: "660px" }}
        >
          Verileri Getir
        </button>
      </form>
    </div>
  );
};

export default MapByDate;
