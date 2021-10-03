import React from "react";
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { MainLogo } from "../../assets";
import { FaUserEdit } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import Avatar from "../../shared/components/Avatar";
import "./UserNavbar.css";

const UserNavbar = () => {
  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/dashboard">
            <img
              src={MainLogo}
              width="40"
              height="40"
              className="d-inline-block align-top ms-2"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <NavDropdown title={<Avatar />} id="basic-nav-dropdown">
            <NavDropdown.Item className="d-flex align-items-center" href="#action/3.1" disabled>
              <FaUserEdit size={"1.07rem"} className="me-1" /> Edit Profile
            </NavDropdown.Item>
            <NavDropdown.Item className="d-flex align-items-center" href="#action/3.1" disabled>
              <IoMdSettings size={"1.07rem"} className="me-1" /> Settings
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className="d-flex align-items-center">
              <IoLogOutSharp size={"1.07rem"} className="me-1" />
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </div>
  );
};

export default UserNavbar;
