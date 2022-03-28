import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Navi from "../layouts/Navi";
import Table from "react-bootstrap/Table";

const Home = () => {
  var decoded = jwt_decode(sessionStorage.getItem("token"));
  let navigate = useNavigate();
  const [userDetail, setuserDetail] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://localhost:44358/api/UserDetail/getTaxiByUsername?username=" +
          decoded.name
      )
      .then((res) => {
        console.log(res.data);
        setuserDetail(res.data);
      });
  }, [decoded.name]);

  return (
    <div>
      <Navi />
      <div>
        <div
          className="btn"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Button
            onClick={() => {
              navigate("/map");
            }}
          >
            Son Yarım Saat
          </Button>
        </div>
        <Table
          striped
          bordered
          hover
          style={{ marginTop: "100px", width: "1000px", marginLeft: "300px" }}
        >
          <thead>
            <tr>
              <th>Araç ID</th>
              <th>Araç Sahibi</th>
              <th>Harita Konumu</th>
            </tr>
          </thead>
          <tbody>
            {userDetail.map((user) => (
              <tr>
                <td>{user.vehicleID}</td>
                <td>{user.username}</td>
                <Button
                style={{backgroundColor:"#33D8FF"}}
                  variant="info"
                  onClick={() => {
                    navigate(`/home/${user.vehicleID}`);
                  }}
                >
                  {user.vehicleID}. Araç
                </Button>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
