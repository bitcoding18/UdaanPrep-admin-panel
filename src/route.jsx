import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./responsive.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProductDetails from "./pages/ProductDetails";
import ProductUpload from "./pages/ProductUpload";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import PSC from "./pages/PSC";
import PSCDetails from "./pages/PSCDetails";

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
        <Route path="/psc" exact={true} element={<PSC />} />
        <Route
          path="/psc/details"
          exact={true}
          element={<PSCDetails />}
        />
        <Route
          path="/psc/details/:id"
          exact={true}
          element={<PSCDetails />}
        />
        <Route path="/course" exact={true} element={<Courses />} />
        <Route
          path="/course/details"
          exact={true}
          element={<CourseDetails />}
        />
        <Route
          path="/course/details/:id"
          exact={true}
          element={<CourseDetails />}
        />
      </Routes>
    </>
  );
};

export default PageRoutes;
