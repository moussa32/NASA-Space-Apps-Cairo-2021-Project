import React from "react";
import { Container, Accordion, Alert } from "react-bootstrap";
import BottomNavigation from "./Layout/BottomNavigation";
import UserNavbar from "./Layout/UserNavbar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Result.css";

const Result = () => {
  const result = JSON.parse(localStorage.getItem("results"));
  const riskFactor = result.risk_factor.risk_factor_probability.toFixed(1);

  return (
    <div>
      <UserNavbar />
      <Container className="tab-container">
        <div className="text-center">
          <CircularProgressbar
            value={result.probability_of_testing_positive.toFixed(1)}
            text={`${result.probability_of_testing_positive.toFixed(1)}%`}
            className="w-100 d-block probability-icon"
          />
          <p>Probability of Testing Positive</p>
        </div>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Diagnostic advice #1</Accordion.Header>
            <Accordion.Body>
              If you are experiencing COVID-19 symptoms, please follow the{" "}
              <a href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/testing.html">
                CDC'S information on COVID-19
              </a>{" "}
              testing
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Diagnostic advice #2</Accordion.Header>
            <Accordion.Body>
              We recommend that you practice hand hygiene following CDC guidance as hand hygiene
              reduces the risk of catching COVID-19 by 53% . We recommend that you wear mask
              following CDC guidelines as wearing mask reduces the risk of catching COVID-19 by 67%.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="text-center mt-4">
          <CircularProgressbar
            value={riskFactor}
            text={`${riskFactor}%`}
            className="probability-icon"
          />
          <p>Risk Factor Probability</p>
        </div>
        {riskFactor <= 33.33 && (
          <Alert variant="danger">
            ShapeYou are at low risk of hospitalization according to your collected information.
            Please be sure that you perform hand hygiene frequently, wear your mask and keep your
            distance.
          </Alert>
        )}
        {(riskFactor > 34.33) & (riskFactor <= 66.66) && (
          <Alert variant="danger">
            Shape You are at low risk of hospitalization according to your collected information.
            Please be sure that you perform hand hygiene frequently, wear your mask and keep your
            distance. <br />
            <p className="mb-0 mt-1 ">Avoid this if possible:</p>
            <ul className="mb-0">
              <li>Wedding or funeral</li> <li>Gym</li> <li>Indoor</li> <li>party</li>{" "}
              <li>Visit nursing home or hospital</li> <li>Sports stadium</li> <li>Movie theatre</li>
              <li>Nightclub</li> <li>Music concert</li> <li>Salon or barbershop</li>.
            </ul>
          </Alert>
        )}
        {(riskFactor > 67.66) & (riskFactor <= 100) && (
          <Alert variant="danger">
            You are at high risk of hospitalization according to your collected information. Please
            be sure that you perform hand hygiene frequently, wear your mask and keep your distance.{" "}
            You may have better fit and extra protection with cloth and disposable masks: Wear two
            masks (disposable mask underneath AND cloth mask on top)
          </Alert>
        )}
      </Container>
      <BottomNavigation />
    </div>
  );
};

export default Result;
