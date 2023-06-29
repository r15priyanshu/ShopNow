import React from "react";
import CustomNavbar from "./CustomNavbar";
import CustomFooter from "./CustomFooter";
import { CartProvider } from "../context/CartContext";

function BaseComponent(props) {
  //console.log("basecomponent.js rendered")
  return (
    <>
      <CustomNavbar />

      {props.children}
      <CustomFooter />
    </>
  );
}

export default BaseComponent;
