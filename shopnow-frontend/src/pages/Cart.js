import React, { useContext, useEffect, useState } from "react";
import BaseComponent from "../components/BaseComponent";
import {
  DeleteItemInCartByCartItemId,
  GetAllItemsInCartByCustomerId,
} from "../services/Order-Cart-Service";
import UserContext from "../context/UserContext";
import { Button, Table } from "reactstrap";
import { toast } from "react-toastify";
import CartContext from "../context/CartContext";
import OrderForm from "../components/OrderForm";
import { PRODUCT_IMAGE_BASE_URL } from "../services/Helper";

function Cart(props) {
  console.log("cart.js rendered");
  const { userContextState } = useContext(UserContext);
  const { cartContextState, setCartContextState } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchItemsFromCart();
  }, []);

  const fetchItemsFromCart = () => {
    GetAllItemsInCartByCustomerId(userContextState.cid)
      .then((response) => {
        setCartItems([...response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCartItemDelete = (cartitemid) => {
    DeleteItemInCartByCartItemId(cartitemid)
      .then((response) => {
        toast.success("Item Successfully Removed From Cart !!");
        setCartContextState(cartContextState-1);
        fetchItemsFromCart();
      })
      .catch((error) => {
        toast.error("Error In Removing Item From Cart !!");
      });
  };

  const DisplayCartItems = cartItems.map((item) => {
    return (
      <tr key={item.cartitemid}>
        <th scope="row">{item.productid}</th>
        <td>
          <img alt="Sample" src={PRODUCT_IMAGE_BASE_URL+item.product.productimage} height={"50px"} width={"50px"}/>
        </td>
        <td>{item.product.name}</td>
        <td>{item.product.category.categoryname}</td>
        <td>RS : {item.product.price}</td>
        <td>
          <Button
            color="danger"
            size="sm"
            onClick={() => handleCartItemDelete(item.cartitemid)}
          >
            REMOVE
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <BaseComponent>
      <div className="Cart container-fluid" style={{minHeight:"500px"}}>
        <div className="row">
          <div className="col-md-4">
            <OrderForm/>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 offset-3">
                <div
                  className="text-center m-2 p-2 rounded-5"
                  style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                >
                  <h2 className="text-primary">SUMMARY</h2>
                  <p className="fw-bold">TOTAL ITEMS : {cartItems.length}</p>
                  <p className="fw-bold">
                    TOTAL PRICE : RS.
                    {cartItems
                      .map((item) => item.product.price)
                      .reduce((a, b) => {
                        return a + b;
                      }, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Table striped>
                  <thead>
                    <tr>
                      <th>PRODUCT-ID</th>
                      <th>PRODUCT-IMAGE</th>
                      <th>PRODUCT-NAME</th>
                      <th>CATEGORY</th>
                      <th>PRICE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>{DisplayCartItems}</tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseComponent>
  );
}

export default Cart;
