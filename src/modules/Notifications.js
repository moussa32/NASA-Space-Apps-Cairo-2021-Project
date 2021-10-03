import React from "react";
import { Container, Card } from "react-bootstrap";
import { TiWarningOutline } from "react-icons/ti";
import BottomNavigation from "./Layout/BottomNavigation";
import UserNavbar from "./Layout/UserNavbar";
import "./Notifications.css";

const Notifications = () => {
  return (
    <>
      <UserNavbar />
      <Container className="mt-2 tab-container">
        <h2 className="text-center">Notifications</h2>
        <Card className="notification-card flex-row p-0 border-0 mt-2">
          <div className="notification-icon-container">
            <TiWarningOutline size={"3rem"} className="warning-icon" />
          </div>
          <Card.Body className="pe-1">
            <Card.Title>Heavy Rain</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor
              incididunt.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="notification-card flex-row p-0 border-0 mt-2">
          <div className="notification-icon-container">
            <TiWarningOutline size={"3rem"} className="warning-icon" />
          </div>
          <Card.Body className="pe-1">
            <Card.Title>Heavy Rain</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor
              incididunt.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="notification-card flex-row p-0 border-0 mt-2">
          <div className="notification-icon-container">
            <TiWarningOutline size={"3rem"} className="warning-icon" />
          </div>
          <Card.Body className="pe-1">
            <Card.Title>Heavy Rain</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor
              incididunt.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="notification-card flex-row p-0 border-0 mt-2">
          <div className="notification-icon-container">
            <TiWarningOutline size={"3rem"} className="warning-icon" />
          </div>
          <Card.Body className="pe-1">
            <Card.Title>Heavy Rain</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor
              incididunt.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
      <BottomNavigation />
    </>
  );
};

export default Notifications;
