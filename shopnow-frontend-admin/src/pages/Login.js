import React, { useContext, useState } from "react";
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
  Button,
} from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginCustomer } from "../services/Customer-Service";
import { toast } from "react-toastify";
import { SaveLoggedInUserDetails } from "../services/Helper";
import UserContext from "../context/UserContext";

function Login(props) {
  console.log("login.js rendered");
  const navigate = useNavigate();
  const [stateData, setStateData] = useState({
    email: "",
    password: "",
  });

  const { setUserContextState } = useContext(UserContext);

  const handleChange = (event) => {
    setStateData({ ...stateData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (stateData.email === "" || stateData.password === "") {
      toast.error("Fields cannot be empty !!");
      return;
    }
    try {
      const response = await LoginCustomer(stateData);
      const userdata = response.data;
      if (userdata.isadmin) {
        //save the data inside the local storage
        SaveLoggedInUserDetails(response.data);
        //set the data in context also , so that it can be shared among various components directly
        setUserContextState({ ...response.data });
        toast.success("Login Successfull !!");
        navigate("/products/category/0/ALL");
      }else{
        toast.error("You are not an admin , Kindly take admin rights first !!")
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleReset = (event) => {
    setStateData({
      email: "",
      password: "",
    });
  };

  return (
    <BaseComponent>
      <div className="Login container" style={{ minHeight: "500px" }}>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Card
              className="my-2 shadow rounded-0"
              style={{ backgroundColor: "rgb(255,255,255,1)" }}
            >
              <CardHeader>
                <h2 className="text-primary" style={{ textAlign: "center" }}>
                  ADMIN LOGIN
                </h2>
              </CardHeader>
              <CardBody>
                <div className="LoginForm">
                  <Form onSubmit={handleSubmit}>
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
                <NavLink to="/register" style={{ color: "red" }}>
                  Haven't Registered? Register Now !!
                </NavLink>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </BaseComponent>
  );
}

export default Login;
