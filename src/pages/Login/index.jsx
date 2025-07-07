import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/square_logo.png";
import patern from "../../assets/images/pattern.webp";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalProvider";
import toast from "react-hot-toast";
import { loginAPI } from "../../services/api-services/auth";

const Login = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    context.setIsHideSidebarAndHeader(true);
  }, []);

  const focusInput = (index) => {
    setInputIndex(index);
  };

  const onLoginBtnClick = async (e) => {
    e.preventDefault();
    const bodyReq = {
      email: email,
      password: password,
    };
    const response = await toast.promise(loginAPI(context, bodyReq), {
      loading: "Signing in...",
      success: (data) => `Welcome, ${data?.data?.name || "Admin"}!`,
      error: (err) => `${err.message || "Login failed."}`,
    });    
    if (response?.statusCode === 200) {
      setEmail('');
      setPassword('');
      navigate("/");
    }
  };

  return (
    <>
      <img src={patern} className="loginPatern" />
      <section className="loginSection">
        <div className="loginBox">
          <div className="logo text-center">
            <img src={Logo} width="90px" height="90px" />
            <h4 className="mt-2 mb-4 fw-bold">Login to UdaanPrep</h4>
          </div>

          <div className="wrapper mt-3 card border">
            <form onSubmit={onLoginBtnClick} autoComplete="on">
              <div
                className={`form-group position-relative ${
                  inputIndex === 0 && "focus"
                }`}
              >
                <span className="icon">
                  <MdEmail />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter your email"
                  onFocus={() => focusInput(0)}
                  autoComplete="email"
                  onBlur={() => focusInput(null)}
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div
                className={`form-group position-relative ${
                  inputIndex === 1 && "focus"
                }`}
              >
                <span className="icon">
                  <RiLockPasswordFill />
                </span>
                <input
                  type={`${isShowPassword ? "text" : "password"}`}
                  className="form-control"
                  placeholder="enter your password"
                  onFocus={() => focusInput(1)}
                  onBlur={() => focusInput(null)}
                  autoComplete="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="toggleShowPassword"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>

              <div className="form-group">
                <Button type="submit" className="btn-blue btn-lg w-100 btn-big">
                  <span className="text-capitalize">{"Sign In"}</span>
                </Button>
              </div>

              <div className="form-group text-center mb-0">
                <Link to={"/forgot-password"} className="link">
                  Forgot Password
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
