import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { CountryDropdown } from "react-country-region-selector";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiTwotoneExperiment,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { BsLockFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import "./Signup.css";

const SignupFirst = ({ currentState, updateUserState, updateStep, formErrors }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    country: "",
    age: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleSetData = e => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setData({ ...data, [inputName]: inputValue });
    updateUserState({ ...currentState, [inputName]: inputValue });
  };

  return (
    <>
      <Container className="pt-4">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <AiOutlineUser size={"1.1rem"} className="mb-1 me-2" />
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              name="username"
              value={currentState.username}
              onChange={handleSetData}
              isInvalid={formErrors?.usernameError}
            />
            {formErrors?.usernameError && (
              <Form.Control.Feedback type="invalid">
                {formErrors?.usernameError}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <AiOutlineMail size={"1.1rem"} className="mb-1 me-2" />
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={currentState.email}
              onChange={handleSetData}
              isInvalid={formErrors?.emailError}
            />
            {formErrors?.emailError && (
              <Form.Control.Feedback type="invalid">{formErrors?.emailError}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <BiWorld size={"1.1rem"} className="mb-1 me-2" />
            <Form.Label>Country</Form.Label>
            <CountryDropdown
              className={`form-select ${formErrors?.countryError ? "is-invalid" : ""}`}
              name="country"
              value={currentState.country}
              onChange={e => updateUserState({ ...currentState, country: e })}
            />
            {formErrors?.countryError && (
              <Form.Control.Feedback type="invalid">
                {formErrors?.countryError}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAge">
            <MdDateRange size={"1.1rem"} className="mb-1 me-2" />
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Age"
              name="age"
              value={currentState.age}
              onChange={e => updateUserState({ ...currentState, age: parseInt(e.target.value) })}
              isInvalid={formErrors?.ageError}
            />
            {formErrors?.ageError && (
              <Form.Control.Feedback type="invalid">{formErrors?.ageError}</Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicGender">
            <AiTwotoneExperiment size={"1.1rem"} className="mb-1 me-2" />
            <Form.Label>Gender</Form.Label>
            <div>
              <Form.Check
                inline
                label="Male"
                value="male"
                name="gender"
                type="radio"
                checked={currentState.gender === "male"}
                id="inline-radio-male"
                onChange={handleSetData}
                isInvalid={formErrors?.genderError}
              />
              <Form.Check
                inline
                checked={currentState.gender === "female"}
                label="Female"
                value="female"
                name="gender"
                type="radio"
                id="inline-radio-female"
                onChange={handleSetData}
                isInvalid={formErrors?.genderError}
              />
            </div>
            {formErrors?.genderError && (
              <Form.Control.Feedback style={{ display: "block" }} type="invalid">
                {formErrors?.genderError}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <BsLockFill size={"1.1rem"} className="mb-1 me-2" />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={currentState.password}
              onChange={handleSetData}
              isInvalid={formErrors?.passwordError}
            />
            {formErrors?.passwordError && (
              <Form.Control.Feedback type="invalid">
                {formErrors?.passwordError}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <BsLockFill size={"1.1rem"} className="mb-1 me-2" />
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={currentState.confirmPassword}
              onChange={handleSetData}
              name="confirmPassword"
              isInvalid={formErrors?.rePasswordError}
            />
            {formErrors?.rePasswordError && (
              <Form.Control.Feedback type="invalid">
                {formErrors?.rePasswordError}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Button
            variant="main"
            type="submit"
            className="rounded-element d-block ml-auto signup-button"
            onClick={() => updateStep("second")}
          >
            <AiOutlineArrowRight size={"1.1rem"} className="mb-1 text-dark" />
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default SignupFirst;
