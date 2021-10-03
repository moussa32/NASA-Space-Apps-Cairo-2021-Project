import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Row, Form, Col, Container, Button, Alert } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Loader from "../shared/components/Loader";
import { postSignup } from "../api/SignupApi";

const SignupSecond = ({
  userInfo,
  currentState,
  updateUserState,
  updateStep,
  updateFormErrors,
  history,
}) => {
  const [disease, setDisease] = useState({
    immunodeficiency_disorder: false,
    chronic_kidney_disease: false,
    cardiovascular_disease: false,
    COPD: false,
    asthma: false,
    cancer: false,
    hypertension: false,
    diabetes: false,
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    const target = e.target;
    const name = target.id;
    const value = target.checked;

    setDisease({ ...disease, [name]: value });
    updateUserState({ ...currentState, [name]: value });
  };

  const formValidation = () => {
    const formErrors = {
      usernameError: "",
      emailError: "",
      countryError: "",
      ageError: "",
      genderError: "",
      passwordError: "",
      rePasswordError: "",
    };
    const stringPattern = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let isValid = true;

    if (userInfo.username.length < 4) {
      formErrors.usernameError = "The username must be at least 4 characters.";
      isValid = false;
    }

    if (stringPattern.test(userInfo.username)) {
      formErrors.usernameError =
        "You can't use a username that contains spaces or special characters.";
      isValid = false;
    }

    if (!userInfo.username) {
      formErrors.usernameError = "This field is required.";
      isValid = false;
    }

    if (!emailPattern.test(String(userInfo.email).toLowerCase())) {
      formErrors.emailError =
        "You must write a valid email allowed (0 to 9), from (a-Z) and (. or _)";
      isValid = false;
    }

    if (!userInfo.email) {
      formErrors.emailError = "This field is required.";
      isValid = false;
    }

    if (!userInfo.country) {
      formErrors.countryError = "This field is required.";
      isValid = false;
    }

    if (!userInfo.age) {
      formErrors.ageError = "This field is required.";
      isValid = false;
    }

    if (!userInfo.password) {
      formErrors.passwordError = "This field is required.";
      isValid = false;
    }

    if (!userInfo.gender) {
      formErrors.genderError = "This field is required.";
      isValid = false;
    }

    if (userInfo.password.length < 8) {
      formErrors.passwordError = "The password should not be less than 8 characters.";
      isValid = false;
    }

    if (!userInfo.confirmPassword) {
      formErrors.rePasswordError = "This field is required.";
      isValid = false;
    }

    if (userInfo.password !== userInfo.confirmPassword) {
      formErrors.passwordError = "The password must be identical.";
      formErrors.rePasswordError = "The password must be identical.";
      isValid = false;
    }

    updateFormErrors(formErrors);
    return isValid;
  };

  const handleSignup = e => {
    e.preventDefault();

    const isValid = formValidation();

    if (isValid) {
      let fullUserData = {
        ...userInfo,
        chronic_diseases: {
          ...currentState,
        },
      };
      setIsLoading(true);

      postSignup(fullUserData)
        .then(res => {
          setIsLoading(false);
          setStatus({ type: "success", message: "Account has been created successfully" });
          setTimeout(() => {
            history.push("/login");
          }, 1500);
        })
        .catch(function (error) {
          setIsLoading(false);
          if (error.response.data.username) {
            updateFormErrors({ usernameError: error.response.data.username });
            updateStep("first");
          } else if (error.response.data.email) {
            updateFormErrors({ emailError: error.response.data.email });
            updateStep("first");
          } else if (error.response.status === 500) {
            setStatus({
              type: "danger",
              message: "Server has problem please try again later",
            });
          }
        });
    } else {
      updateStep("first");
    }
  };

  return (
    <Container className="pt-4">
      <Form onSubmit={handleSignup}>
        <Row>
          <Form.Label column lg={2}>
            Chronic Disease :
          </Form.Label>
          <Col className="ms-4">
            <Form.Check
              type="checkbox"
              id="immunodeficiency_disorder"
              className="mb-2"
              checked={currentState.immunodeficiency_disorder}
              label="Immunodeficiency Disorder"
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              id="chronic_kidney_disease"
              checked={currentState.chronic_kidney_disease}
              className="mb-2"
              label="Chronic kidney disease"
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              id="cardiovascular_disease"
              checked={currentState.cardiovascular_disease}
              className="mb-2"
              label="Cardiovascular Disease"
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              id="COPD"
              checked={currentState.COPD}
              className="mb-2"
              label="COPD"
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              id="asthma"
              checked={currentState.asthma}
              className="mb-2"
              label="Asthma"
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              id="cancer"
              checked={currentState.cancer}
              className="mb-2"
              label="Cancer"
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              id="hypertension"
              className="mb-2"
              checked={currentState.hypertension}
              label="Hypertension"
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              id="diabetes"
              className="mb-2"
              label="Diabetes"
              checked={currentState.diabetes}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <div className="d-flex bd-highlight mt-3">
          <Button
            style={{ width: "6rem" }}
            variant="main"
            type="submit"
            className="rounded-element ml-auto md-auto"
            onClick={() => updateStep("first")}
          >
            <AiOutlineArrowLeft size={"1.1rem"} className="mb-1 text-dark" />
          </Button>
          <Button
            variant="main"
            type="submit"
            className="rounded-element ms-auto"
            style={{ width: "6rem" }}
            onClick={handleSignup}
          >
            <AiOutlineArrowRight size={"1.1rem"} className="mb-1 text-dark" />
          </Button>
        </div>
        <div className="mx-auto my-4">
          <Loader isLoadding={isLoading} />
        </div>
        {status && <Alert variant={status.type}>{status.message}</Alert>}
      </Form>
    </Container>
  );
};

export default withRouter(SignupSecond);
