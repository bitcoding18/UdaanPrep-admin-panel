import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/square_logo.png";
import { MyContext } from "../../App";
import patern from "../../assets/images/pattern.webp";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff, IoMdHome } from "react-icons/io";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import googleIcon from "../../assets/images/google-icon.png";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FormControlLabel, Checkbox } from "@mui/material";

const SignUp = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const context = useContext(MyContext);

  useEffect(() => {
    context.setIsHideSidebarAndHeader(true);
    window.scrollTo(0, 0);
  }, []);

  const focusInput = (index) => {
    setInputIndex(index);
  };

  return (
    <>
      <img src={patern} className="loginPatern" />
      <section className="loginSection signUpSection">
        <div className="row">
          <div className="col-md-8 d-flex align-items-center flex-column part1 justify-content-center">
            <h1>
              Best ux/ui fashion{" "}
              <span className="text-sky">ecommerce dashboard</span> & admin
              panel
            </h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </p>
            <div className="w-100 mt-4">
              <Link to={"/"}>
                <Button className="btn-blue btn-lg btn-big">
                  <IoMdHome /> Go To Home
                </Button>
              </Link>
            </div>
          </div>

          <div className="col-md-4 pe-0">
            <div className="loginBox">
              <div className="logo text-center">
                <img src={Logo} width="90px" height="90px" />
                <h4 className="mt-4 mb-4 fw-bold">Register a new account</h4>
              </div>

              <div className="wrapper mt-4 card border">
                <form>
                  <div
                    className={`form-group position-relative ${
                      inputIndex === 0 && "focus"
                    }`}
                  >
                    <span className="icon">
                      <FaUserCircle />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter your name"
                      onFocus={() => focusInput(0)}
                      onBlur={() => focusInput(null)}
                      autoFocus
                    />
                  </div>

                  <div
                    className={`form-group position-relative ${
                      inputIndex === 1 && "focus"
                    }`}
                  >
                    <span className="icon">
                      <MdEmail />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter your email"
                      onFocus={() => focusInput(1)}
                      onBlur={() => focusInput(null)}
                    />
                  </div>

                  <div
                    className={`form-group position-relative ${
                      inputIndex === 2 && "focus"
                    }`}
                  >
                    <span className="icon">
                      <RiLockPasswordFill />
                    </span>
                    <input
                      type={`${isShowPassword ? "text" : "password"}`}
                      className="form-control"
                      placeholder="enter your password"
                      onFocus={() => focusInput(2)}
                      onBlur={() => focusInput(null)}
                    />
                    <span
                      className="toggleShowPassword"
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                      {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
                    </span>
                  </div>

                  <div
                    className={`form-group position-relative ${
                      inputIndex === 3 && "focus"
                    }`}
                  >
                    <span className="icon">
                      <IoShieldCheckmarkSharp />
                    </span>
                    <input
                      type={`${isShowConfirmPassword ? "text" : "password"}`}
                      className="form-control"
                      placeholder="confirm your password"
                      onFocus={() => focusInput(3)}
                      onBlur={() => focusInput(null)}
                    />
                    <span
                      className="toggleShowPassword"
                      onClick={() =>
                        setIsShowConfirmPassword(!isShowConfirmPassword)
                      }
                    >
                      {isShowConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                    </span>
                  </div>

                  <FormControlLabel
                    control={<Checkbox />}
                    label="I agree to the all Terms and Conditions"
                  />

                  <div className="form-group">
                    <Button className="btn-blue btn-lg w-100 btn-big mt-3">
                      <span className="text-uppercase">{"Sign Up"}</span>
                    </Button>
                  </div>

                  <div className="form-group text-center mt-4 mb-4">
                    <div className="d-flex align-items-center justify-content-center or mt-3 m-3">
                      <span className="line"></span>
                      <span className="txt">or</span>
                      <span className="line"></span>
                    </div>
                  </div>

                  <Button
                    variant="outlined"
                    className="w-100 btn-lg btn-big loginWithGoogle mb-5"
                  >
                    <img src={googleIcon} width="25px" /> &nbsp; Sign Up with
                    Google
                  </Button>
                </form>

                <span className="text-center mt-3">
                  Already have an account?
                  <Link to={"/login"} className="link color ms-2">
                    Sign In
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
