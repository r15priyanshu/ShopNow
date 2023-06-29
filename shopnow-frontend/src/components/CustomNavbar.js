import React, { useContext, useState } from "react";
import { NavLink as ReactRouterNavLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { DeleteLoggedInUserDetails, isLoggedIn } from "../services/Helper";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";

function CustomNavbar() {
  console.log("navbar.js rendered");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { userContextState, setUserContextState } = useContext(UserContext);
  const { cartContextState } = useContext(CartContext);
  const isUserLoggedIn = isLoggedIn();

  const handleLogout = () => {
    if (isLoggedIn()) {
      DeleteLoggedInUserDetails();
      setUserContextState(null);
      toast.success("Logged Out Successfully !!");
      navigate("/login");
    }
  };

  return (
    <div className="CustomNavbar container-fluid m-0 p-0">
      <Navbar color="primary" dark expand="md" className="p-3">
        <NavbarBrand tag={ReactRouterNavLink} to="/home">
          <i className="fa-solid fa-bag-shopping fa-lg"></i> SHOP-NOW
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactRouterNavLink} to="/home">
                HOME
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactRouterNavLink} to="/about">
                ABOUT
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactRouterNavLink} to="/products/category/0/ALL">
                PRODUCTS
              </NavLink>
            </NavItem>
          </Nav>

          <Nav className="ms-auto" navbar>
            {isUserLoggedIn && (
              <NavItem>
                <NavLink tag={ReactRouterNavLink} to={"/profile"}>
                  PROFILE
                </NavLink>
              </NavItem>
            )}

            {isUserLoggedIn && (
              <NavItem>
                <NavLink tag={ReactRouterNavLink} to={"/cart"}>
                  <i className="fa-solid fa-cart-shopping"></i>({" "}
                  {cartContextState} )
                </NavLink>
              </NavItem>
            )}

            {isUserLoggedIn && (
              <NavItem>
                <NavLink tag={ReactRouterNavLink} to={"/orders"}>
                  MY-ORDERS
                </NavLink>
              </NavItem>
            )}
            {isUserLoggedIn && (
              <NavItem>
                <NavLink onClick={handleLogout}>LOGOUT</NavLink>
              </NavItem>
            )}

            {!isUserLoggedIn && (
              <NavItem>
                <NavLink tag={ReactRouterNavLink} to="/login">
                  LOGIN
                </NavLink>
              </NavItem>
            )}
            {!isUserLoggedIn && (
              <NavItem>
                <NavLink tag={ReactRouterNavLink} to="/register">
                  REGISTER
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
