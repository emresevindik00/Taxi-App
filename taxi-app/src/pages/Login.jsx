import React, { useState } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom"

const Login = () => {

  const log = (sign) => {
    if(sign === true) {
      navigate('/home');
    }
  }

  let navigate = useNavigate();

  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [isSigned, setisSigned] = useState(false);

  const handleSubmit = (event) => {
  event.preventDefault();

  const data = {
    username: username,
    password: password
  };

  axios.post('https://localhost:44358/api/Auth',data)
  .then((res) => {
    console.log(res.data);
    sessionStorage.setItem('token',res.data);
    setisSigned(true);
  })
  .catch((err) => {
    console.log(err);
    alert('Yanlış Şifre veya Kullanıcı Adı');
  })
}
    

  return (
    <div>
      <form onSubmit={handleSubmit} style={{marginTop:"120px"}}>
        <div className="form-group" style={{marginLeft: "600px"}}>
          <label>Kullanıcı Adı</label>
          <input
            style={{ width: "350px"}}
            className="form-control"
            type="text"
            onChange={(e) => setusername(e.target.value)}
          />
        </div>

        <div className="form-group" style={{marginTop:"20px", marginLeft: "600px" }}>
          <label>Şifre</label>
          <input
            style={{ width: "350px" }}
            className="form-control"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary btn-block"
          style={{ marginTop: "30px", width: "200px", marginLeft: "680px" }}
        >
          Giriş Yap
        </button>
      </form>
      {log(isSigned)}
    </div>
  )
}

export default Login