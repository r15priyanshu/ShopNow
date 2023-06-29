import React, { useContext, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";
import { isLoggedIn } from "../services/Helper";
function ProductView(props) {
  const { name, price, description, category, pid } = props.product;
  const { userContextState } = useContext(UserContext);
  const isUserLoggedIn = isLoggedIn();

  const handleAddtoCart = () => {
    
  };
  return (
    <Card>
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          CATEGORY : {category.categoryname}
        </CardSubtitle>
        <CardText>{description}</CardText>
        <div className="text-center">
          <Button disabled color="primary" className="m-1">
            RS : {price}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default ProductView;
