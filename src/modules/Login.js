import React, { useState } from "react";
import { Col, Row, Form, Button, Container, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { withRouter, Link } from "react-router-dom";
import { postLogin } from "../api/LoginApi";
import MainNavbar from "./Layout/MainNavbar";
import Loader from "../shared/components/Loader";
import "./Login.css";

const Login = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoadding, setIsLoadding] = useState(false);

  const handleLogin = e => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setUserInfo({ ...userInfo, [inputName]: inputValue });
  };

  const onSubmit = data => {
    setStatus({ type: "", message: "" });
    setIsLoadding(true);

    postLogin(data)
      .then(res => {
        console.log(res);
        setStatus({ type: "success", message: "You are logged in successfully" });
        localStorage.setItem("accesstoken", res?.access);
        localStorage.setItem("refreshtoken", res?.refresh);
        localStorage.setItem("isAuthenticated", "true");
        setIsLoadding(false);

        setTimeout(() => {
          history.push("/dashboard");
        }, 1500);
      })
      .catch(error => {
        setIsLoadding(false);
        if (error.response.status === 401) {
          setStatus({
            type: "danger",
            message: "No active account found with the given credentials",
          });
        }
      });
  };

  return (
    <>
      <MainNavbar />
      <div className="login-background"></div>
      <Container style={{ zIndex: 1000, position: "relative" }}>
        <Row className="mt-4">
          <Col className="px-4">
            <h1 className="text-center text-white">Sign In</h1>
            <Form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-white">Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  className="rounded-element"
                  onChange={handleLogin}
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="rounded-element"
                  onChange={handleLogin}
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <Form.Control.Feedback type="invalid">
                    This field is required
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Button variant="second" type="submit" className="rounded-element w-100">
                Login
              </Button>
              <Form.Text className="text-muted text-center d-block mt-2">
                Don't have account? <Link to="/signup">Sign Up</Link>
              </Form.Text>
              {status && (
                <Alert variant={status.type} className="mt-4 text-center">
                  {status.message}
                </Alert>
              )}
              <Loader isLoadding={isLoadding} Color="second" />
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(Login);
