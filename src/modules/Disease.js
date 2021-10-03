import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { VscInfo } from "react-icons/vsc";
import { postDisease } from "../api/DiseaseApi";
import BottomNavigation from "./Layout/BottomNavigation";
import { withRouter } from "react-router";
import UserNavbar from "./Layout/UserNavbar";

const Disease = ({ history }) => {
  const [exposure, setExposure] = useState([]);
  const [diseases, setDisease] = useState({
    risk_calculation: {
      race: "admixed_african_european",
      BMI: { weight: 1, hight: 1 },
      exposure: [],
    },
    diagnostic: {
      loss_of_smell: 0,
      fever: 0,
      covid_at_home: 0,
      shortness_of_breath: 0,
      myalgia: 0,
      cough: 0,
      nausea: 0,
      sore_throat: 0,
      coryza: 0,
      diarrhea: 0,
      headache: 0,
    },
  });

  const userAccessToken = localStorage.getItem("accesstoken");

  const updateSymptoms = e => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const inputChecked = e.target.checked;

    console.log(inputName, inputValue, inputChecked);

    const convertValue = value => {
      if (value) {
        return 1;
      } else {
        return 0;
      }
    };

    setDisease({
      ...diseases,
      diagnostic: {
        ...diseases.diagnostic,
        [inputName]: convertValue(inputChecked),
      },
    });
  };

  const updateExposure = e => {
    const inputName = e.target.name;
    const inputChecked = e.target.checked;
    const item = exposure;

    console.log(inputName, inputChecked);

    if (inputChecked) {
      item.push(inputName);
    } else {
      const index = item.indexOf(inputName);
      if (index > -1) {
        item.splice(index, 1);
      }
    }

    setDisease({
      ...diseases,
      risk_calculation: {
        ...diseases.risk_calculation,
        exposure: [...exposure],
      },
    });
  };

  const handleSubmit = () => {
    postDisease(userAccessToken, diseases).then(res => {
      localStorage.setItem("results", JSON.stringify(res));

      console.log(res);
      setTimeout(() => {
        history.push("/result");
      }, 1500);
    });
  };

  return (
    <>
      <UserNavbar />
      <Container className="tab-container">
        <Form.Group className="mb-3" controlId="Weight">
          <Form.Label
            className="bg-second text-white w-100 d-flex align-items-center"
            style={{ borderRadius: "20px" }}
          >
            <VscInfo size={"1.8rem"} className="me-2" /> Weight (kg):
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Weight (kg)"
            onChange={e =>
              setDisease({
                ...diseases,
                risk_calculation: {
                  ...diseases.risk_calculation,
                  BMI: { ...diseases.risk_calculation.BMI, weight: parseFloat(e.target.value) },
                },
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Height">
          <Form.Label
            className="bg-second text-white w-100 d-flex align-items-center"
            style={{ borderRadius: "20px" }}
          >
            <VscInfo size={"1.8rem"} className="me-2" /> Height (ms):
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Height (ms)"
            onChange={e =>
              setDisease({
                ...diseases,
                risk_calculation: {
                  ...diseases.risk_calculation,
                  BMI: { ...diseases.risk_calculation.BMI, hight: parseFloat(e.target.value) },
                },
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Race">
          <Form.Label
            className="bg-second text-white w-100 d-flex align-items-center"
            style={{ borderRadius: "20px" }}
          >
            <VscInfo size={"1.8rem"} className="me-2" /> My race is:
          </Form.Label>
          <Form.Select
            aria-label="Default select"
            onChange={e =>
              setDisease({
                ...diseases,
                risk_calculation: { ...diseases.risk_calculation, race: e.target.value },
              })
            }
          >
            <option value="admixed_african_european">Admixed african european</option>
            <option value="european">European</option>
            <option value="admixed_amerindian">Admixed Amerindian</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Exposure">
          <Form.Label
            className="bg-second text-white w-100 d-flex align-items-center"
            style={{ borderRadius: "20px" }}
          >
            <VscInfo size={"1.8rem"} className="me-2" /> Exposure:
          </Form.Label>
          <Form.Check
            type="checkbox"
            label="Biological Relative Tested Positive"
            name="biological_relative_tested_positive"
            className="ms-2"
            onChange={updateExposure}
          />
          <Form.Check
            type="checkbox"
            label="Directly Exposed To Someone Who Tested Positive"
            name="directly_exposed_to_someone_who_tested_positive"
            className="ms-2"
            onChange={updateExposure}
          />
          <Form.Check
            type="checkbox"
            label="Healthcare Worker Directly Exposed"
            name="healthcare_worker_directly_exposed"
            className="ms-2"
            onChange={updateExposure}
          />
          <Form.Check
            type="checkbox"
            label="Household Member Tested Positive"
            name="household_member_tested_positive"
            className="ms-2"
            onChange={updateExposure}
          />
          <Form.Check
            type="checkbox"
            label="Any"
            name="any"
            className="ms-2"
            onChange={updateExposure}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Symptoms">
          <Form.Label
            className="bg-second text-white w-100 d-flex align-items-center"
            style={{ borderRadius: "20px" }}
          >
            <VscInfo size={"1.8rem"} className="me-2" /> Symptoms:
          </Form.Label>
          <Form.Check
            type="checkbox"
            label="Fever"
            name="fever"
            className="ms-2"
            onChange={updateSymptoms}
          />
          <Form.Check
            type="checkbox"
            label="Coryza"
            name="coryza"
            className="ms-2"
            onChange={updateSymptoms}
          />
          <Form.Check
            type="checkbox"
            label="Do you live with a Covid19 patient"
            name="covid_at_home"
            className="ms-2"
            onChange={updateSymptoms}
          />
          <Form.Check
            type="checkbox"
            label="Loss of smell"
            name="loss_of_smell"
            className="ms-2"
            onChange={updateSymptoms}
          />
          <Form.Check
            type="checkbox"
            label="Myalgia"
            name="myalgia"
            className="ms-2"
            onChange={updateSymptoms}
          />
          <Form.Check
            type="checkbox"
            label="Shortness of breath"
            name="shortness_of_breath"
            className="ms-2"
            onChange={updateSymptoms}
          />
          <Form.Check
            type="checkbox"
            label="Dry cough"
            name="cough"
            className="ms-2"
            onChange={updateSymptoms}
          />
          <Form.Check
            type="checkbox"
            label="Nausea"
            name="nausea"
            className="ms-2"
            onChange={updateSymptoms}
          />
          <Form.Check
            type="checkbox"
            label="Diarrhea"
            name="diarrhea"
            className="ms-2"
            onChange={updateSymptoms}
          />
          <Form.Check
            type="checkbox"
            label="Sore throat"
            name="sore_throat"
            className="ms-2"
            onChange={updateSymptoms}
          />
          <Form.Check
            type="checkbox"
            label="Headache"
            name="headache"
            className="ms-2"
            onChange={updateSymptoms}
          />
        </Form.Group>

        <Button variant="main" className="w-100" size="lg" onClick={handleSubmit}>
          Calculate
        </Button>

        <Row>
          <Col>
            <BottomNavigation />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(Disease);
