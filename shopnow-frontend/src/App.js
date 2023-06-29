import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";

import PrivateRoute from "./pages/PrivateRoute";

import { CartProvider } from "./context/CartContext";

function App() {
  console.log("app.js rendered");
  return (
    <UserProvider>
      <CartProvider>
        <div className="App">
          <BrowserRouter>
            <ToastContainer position="bottom-right" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/products/category/:categoryid/:categoryname"
                element={<Products />}
              />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="cart" element={<Cart />} />
                <Route path="profile" element={<Profile />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
