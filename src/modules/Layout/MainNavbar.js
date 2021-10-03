import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MainLogo } from "../../assets";

const MainNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none text-white">
            <img
              alt="Virus Alert"
              src={MainLogo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Virus Alert
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
