import React, { useState } from "react";
import { Container } from "react-bootstrap";
import MainNavbar from "./Layout/MainNavbar";
import SignupFirst from "./SignupFirst";
import SignupSecond from "./SignupSecond";

const Signup = () => {
  const [firstStepData, setFirstStepData] = useState({
    username: "",
    email: "",
    country: "",
    age: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [secondStepData, setSecondStepData] = useState({
    immunodeficiency_disorder: false,
    chronic_kidney_disease: false,
    cardiovascular_disease: false,
    COPD: false,
    asthma: false,
    cancer: false,
    hypertension: false,
    diabetes: false,
  });
  const [step, setStep] = useState("first");
  const [formValidationError, setFormValidationError] = useState({});

  return (
    <>
      <MainNavbar />
      <Container className="pt-4">
        {step === "first" ? (
          <SignupFirst
            formErrors={formValidationError}
            currentState={firstStepData}
            updateUserState={setFirstStepData}
            updateStep={setStep}
          />
        ) : (
          <SignupSecond
            updateFormErrors={setFormValidationError}
            userInfo={firstStepData}
            currentState={secondStepData}
            updateUserState={setSecondStepData}
            updateStep={setStep}
          />
        )}
      </Container>
    </>
  );
};

export default Signup;
