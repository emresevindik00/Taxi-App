import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const Navi = () => {
  let navigate = useNavigate();

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{marginLeft:"160px"}}>
              <Button variant="dark" onClick={() => {
                  navigate('/home')
              }}>
                  Ana Sayfa
              </Button>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Profil</Nav.Link>
              <Nav.Link href="#pricing">Araçlarım</Nav.Link>
            </Nav>
            <Nav style={{ marginRight: "200px" }}>
              <Button variant="danger" onClick={() => {
                  sessionStorage.clear();
                  navigate('/');
              }}>Çıkış</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navi;
