import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./responsive.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProductDetails from "./pages/ProductDetails";
import ProductUpload from "./pages/ProductUpload";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import Courses from "./pages/Courses";

const PageRoutes = () => {
  const PrivateRoute = ({ children }) => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    return isLogin ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          exact={true}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/admin" exact={true} element={<Admin />} />
        <Route path="/student" exact={true} element={<Student />} />
        <Route path="/login" exact={true} element={<Login />} />
        <Route path="/signUp" exact={true} element={<SignUp />} />
        {/* <Route path="/products" exact={true} element={<Products />} /> */}
        <Route
          path="/product/details"
          exact={true}
          element={<ProductDetails />}
        />
        <Route
          path="/product/upload"
          exact={true}
          element={<ProductUpload />}
        />
        <Route path="/courses" exact={true} element={<Courses />} />
      </Routes>
    </>
  );
};

export default PageRoutes;
