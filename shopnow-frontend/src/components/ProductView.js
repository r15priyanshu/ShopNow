import React, { useContext, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { AddProductsToCart } from "../services/Order-Cart-Service";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";
import CartContext from "../context/CartContext";
import { PRODUCT_IMAGE_BASE_URL, isLoggedIn } from "../services/Helper";
function ProductView(props) {
  const { name, price, description, category, pid,productimage } = props.product;
  const [inCart, setInCart] = useState(false);
  const { userContextState } = useContext(UserContext);
  const { cartContextState, setCartContextState } = useContext(CartContext);
  const isUserLoggedIn = isLoggedIn();

  const handleAddtoCart = () => {
    //console.log(pid);
    AddProductsToCart(pid, userContextState.cid)
      .then(() => {
        toast.success("Product Added Successfully To Cart !!");
        setInCart(true);
        setCartContextState(cartContextState + 1);
      })
      .catch(() => {
        toast.error("Something Went Wrong While Adding Product To Cart !!");
      });
  };
  return (
    <Card>
      <img alt="Sample" src={PRODUCT_IMAGE_BASE_URL+productimage} height={"275px"}/>
      <CardBody>
        <CardTitle tag="h5" className="fw-bold">{name}</CardTitle>
        <CardSubtitle className="mb-2 text-primary fw-bold" tag="h6">
          CATEGORY : {category.categoryname}
        </CardSubtitle>
        <CardText><div style={{textAlign:"justify"}}>{description}</div></CardText>
        <div className="text-center">
          <Button disabled color="primary" className="m-1">
            RS : {price}
          </Button>
          <Button
            color="warning"
            className="m-1"
            onClick={handleAddtoCart}
            disabled={isUserLoggedIn ? inCart : true}
          >
            {inCart ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default ProductView;
