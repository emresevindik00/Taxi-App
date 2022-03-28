import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Map from "../pages/Map";
import MapByDate from "../pages/MapByDate";
import MapById from "../pages/MapById";

const Dashboard = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/map" element={<Map />}></Route>
        <Route exact path="/mapbydate" element={<MapByDate />}></Route>
        <Route exact path="/home/:id" element={<MapById />}></Route>
      </Routes>
    </div>
  );
};

export default Dashboard;
