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
import { PlaceOrder } from "../services/Order-Cart-Service";
import CartContext from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function OrderForm(props) {
  console.log("orderform.js rendered");
  const { userContextState } = useContext(UserContext);
  const { cartContextState, setCartContextState } = useContext(CartContext);
  const navigate=useNavigate();
  const [stateData, setStateData] = useState({
    email: userContextState.email,
    fullname: userContextState.fullname,
    mobile: userContextState.mobile,
    address: userContextState.address,
    paymenttype: "COD",
  });

  const handleChange = (event) => {
    setStateData({ ...stateData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(stateData);
    try {
      const response = await PlaceOrder(userContextState.cid, stateData);
      console.log(response.data);
      setCartContextState(0);
      toast.success("Order Placed Successfully !!");
      navigate("/orders");
    } catch (error) {
      toast.error("Something went wrong while placing Order !!");
    }
  };

  return (
    <div className="OrderForm container" style={{ minHeight: "500px" }}>
      <Card
        className="my-2 shadow rounded-0"
        style={{ backgroundColor: "rgb(255,255,255,1)" }}
      >
        <CardHeader>
          <h2 className="text-primary" style={{ textAlign: "center" }}>
            SHIPPING DETAILS
          </h2>
        </CardHeader>
        <CardBody>
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
              <FormGroup>
                <Label for="PaymentSelect">Select Payment Type</Label>
                <Input
                  id="PaymentSelect"
                  name="paymenttype"
                  type="select"
                  onChange={handleChange}
                >
                  <option>COD</option>
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                </Input>
              </FormGroup>
              <div className="container text-center">
                <Button
                  className="btn btn-sm"
                  color="primary"
                  disabled={cartContextState === 0 ? true : false}
                >
                  Place Order
                </Button>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default OrderForm;
