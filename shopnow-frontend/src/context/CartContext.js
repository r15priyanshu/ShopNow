import React, { useState, useContext, useEffect } from "react";
import UserContext from "./UserContext";
import { GetAllItemsInCartByCustomerId } from "../services/Order-Cart-Service";
import { isLoggedIn } from "../services/Helper";
const CartContext = React.createContext();

//This is custom cart count provider which helps to manipulate actual Provider value with the help of state
function CartProvider(props) {
  const { userContextState, setUserContextState } = useContext(UserContext);
  const [cartContextState, setCartContextState] = useState(0);
  useEffect(() => {
    isLoggedIn() &&
      GetAllItemsInCartByCustomerId(userContextState.cid)
        .then((result) => {
          setCartContextState(result.data.length);
        })
        .catch((err) => {
          console.log(err);
        });
  });
  return (
    <CartContext.Provider
      value={{
        cartContextState: cartContextState,
        setCartContextState: setCartContextState,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export { CartProvider }; //named export
export default CartContext; //default export [ you need to export the context object so that you can refer to it while using useContext() hooks]
