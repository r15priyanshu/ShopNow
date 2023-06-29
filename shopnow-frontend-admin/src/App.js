import {
  BrowserRouter,
  Route,
  Routes,
  Redirect,
  Navigate,
} from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";

import PrivateRoute from "./pages/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";

function App() {
  console.log("app.js rendered");
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <ToastContainer position="bottom-right" />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route
                path="/products/category/:categoryid/:categoryname"
                element={<Products />}
              />
              <Route path="profile" element={<Profile />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="categories" element={<Categories />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
