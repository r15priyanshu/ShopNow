import BaseComponent from "../components/BaseComponent";
import React, { useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";
import { UpdateCustomerDetailsById } from "../services/Customer-Service";
import { DeleteLoggedInUserDetails, isLoggedIn } from "../services/Helper";
import { useNavigate } from "react-router-dom";

import DefaultProfilePic from "../images/defaultprofilepic.jpg"

function Profile() {
  const { userContextState,setUserContextState } = useContext(UserContext);
  const [stateData, setStateData] = useState(userContextState);
  const [isVisible,setIsVisible]=useState(false);
  const navigate=useNavigate();

  const toggleVisible = (event) => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response=await UpdateCustomerDetailsById(userContextState.cid,stateData);
      if(isLoggedIn())
      {
        DeleteLoggedInUserDetails();
        setUserContextState(null);
        toast.success("Profile Updated Successfully,Login Again !!");
        navigate("/login")
      }
    } catch (error) {
      toast.error("Something went wrong while Updating Profile Details !!");
    }
  };

  const handleChange = (event) => {
    setStateData({...stateData,[event.target.name]:event.target.value})
  };

  return (
    <BaseComponent>
      <div className="ProfileForm container" style={{ minHeight: "500px" }}>
        <div className="row">
          <div className="col-md-6 offset-3">
            <Card
              className="my-2 shadow rounded-0"
              style={{ backgroundColor: "rgb(255,255,255,1)" }}
            >
              <CardHeader>
                <h2 className="text-primary" style={{ textAlign: "center" }}>
                  PROFILE DETAILS
                </h2>
              </CardHeader>
              <CardBody>
              <div className="text-center">
                <img src={DefaultProfilePic} alt="DefaultProfilePic" height={"100px"} width={"100px"} className="rounded-1"/>
              </div>
                <div>
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
                        disabled
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        className="rounded-0"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        type={isVisible?"text":"password"}
                        value={stateData.password}
                        onChange={handleChange}
                      />
                      <Button size="sm mt-1" onClick={toggleVisible}><i className="fa-solid fa-eye"></i></Button>
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
                        min={1000000000}
                        max={9999999999}
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
                      <Button className="btn btn-sm" color="primary">
                        Update Details
                      </Button>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </BaseComponent>
  );
}

export default Profile;
