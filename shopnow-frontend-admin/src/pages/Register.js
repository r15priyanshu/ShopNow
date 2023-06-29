import React, { useState } from "react";
import BaseComponent from "../components/BaseComponent";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterCustomer } from "../services/Customer-Service";

function Register(props) {
  console.log("register.js rendered")
  const [stateData, setStateData] = useState({
    fullname: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });

  function handleChange(event) {
    setStateData({ ...stateData, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    //check whether all fields do have some data
    if (Object.keys(stateData).some((key) => stateData[key] === "")) {
      toast.error("Feilds cannot be empty !!");
      return;
    }

    try {
      await RegisterCustomer(stateData);
      toast.success("Registered Successfully !!");
      handleReset();
    } catch (error) {
      toast.error("Error Occurred !!");
    }
  };

  const handleReset = (event) => {
    setStateData({
      fullname: "",
      email: "",
      password: "",
      mobile: "",
      address: "",
    });
  };

  return (
    <BaseComponent>
      <div className="Register container" style={{ minHeight: "500px" }}>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Card
              className="my-2 rounded-0"
              style={{ backgroundColor: "rgb(255,255,255,0.4)" }}
            >
              <CardHeader>
                <h2 className="text-primary" style={{ textAlign: "center" }}>
                  REGISTER
                </h2>
              </CardHeader>
              <CardBody>
                <div className="SignUpForm">
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="fullname">Full Name</Label>
                      <Input
                        className="rounded-0"
                        id="fullname"
                        name="fullname"
                        placeholder="Enter Full Name"
                        type="text"
                        value={stateData.fullname}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        className="rounded-0"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        type="text"
                        value={stateData.email}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        className="rounded-0"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        type="password"
                        value={stateData.password}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="mobile">Mobile</Label>
                      <Input
                        className="rounded-0"
                        id="mobile"
                        name="mobile"
                        placeholder="Enter Mobile Number"
                        type="number"
                        value={stateData.mobile}
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="about">Address</Label>
                      <Input
                        className="rounded-0"
                        id="address"
                        name="address"
                        type="textarea"
                        value={stateData.address}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <div className="container text-center">
                      <Button className="btn btn-sm">Submit</Button>
                      <Button
                        className="btn btn-sm btn-danger ms-2"
                        type="reset"
                        onClick={handleReset}
                      >
                        Reset
                      </Button>
                    </div>
                  </Form>
                </div>
              </CardBody>
              <CardFooter className="text-center">
                <NavLink to="/login">Already Registered? Login Now !!.</NavLink>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </BaseComponent>
  );
}

export default Register;
