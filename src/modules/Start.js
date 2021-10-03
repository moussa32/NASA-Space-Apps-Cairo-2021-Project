import React from "react";
import { Carousel } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { RiskFactorLogo, DashboardLogo, ResultsLogo } from "../assets/index";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import "./Start.css";
import MainNavbar from "./Layout/MainNavbar";

const Start = () => {
  return (
    <>
      <MainNavbar />
      <Carousel
        className="start-slider"
        nextIcon={<AiOutlineArrowRight size={"1.8rem"} className="text-black" />}
        prevIcon={<AiOutlineArrowLeft size={"1.8rem"} className="text-black" />}
      >
        <Carousel.Item>
          <img className="d-block" src={RiskFactorLogo} alt="Risk Factor" />
          <Carousel.Caption>
            <h3 className="text-black">Risk Factor</h3>
            <p className="text-black">
              You can calculate your covid19 risk factor by answering some questions.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block" src={DashboardLogo} alt="Dashboard" />

          <Carousel.Caption>
            <h3 className="text-black">Dashboard</h3>
            <p className="text-black">
              Simple and user friendly dashboard that keeps track of Covid stats.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block" src={ResultsLogo} alt="Third slide" />

          <Carousel.Caption>
            <h3 className="text-black">Good Diagnosis</h3>
            <p className="text-black">
              We relied on reliable scientific equations to develop robust diagnostic algorithms.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="mx-3">
        <Link to="/login" className="btn btn-main rounded-element w-100 mt-4 d-block">
          Get Start
        </Link>
      </div>
    </>
  );
};

export default withRouter(Start);
