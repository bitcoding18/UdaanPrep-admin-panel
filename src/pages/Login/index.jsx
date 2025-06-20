import { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/square_logo.png";
import { MyContext } from "../../App";
import patern from "../../assets/images/pattern.webp";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const [inputIndex, setInputIndex] = useState(0);
  const context = useContext(MyContext);

  useEffect(() => {
    context.setIsHideSidebarAndHeader(true);
  }, []);

  const focusInput = (index) => {
    setInputIndex(index);
  }

  return (
    <>
      <img src={patern} className="loginPatern" />
      <section className="loginSection">
        <div className="loginBox">
          <div className="logo text-center">
            <img src={Logo} width="90px" height="90px" />
            <h5>Login to UdaanPrep</h5>
          </div>

          <div className="wrapper mt-3 card border p-4">
            <form>
              <div className={`form-group mb-3 position-relative ${inputIndex === 0 && 'focus'}`}>
                <span className="icon">
                  <MdEmail />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter your email"
                  onFocus={() => focusInput(0)}
                  onBlur={() => focusInput(null)}
                />
              </div>

              <div className={`form-group mb-3 position-relative ${inputIndex === 0 && 'focus'}`}>
                <span className="icon">
                  <MdEmail />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter your email"
                  onFocus={() => focusInput(0)}
                  onBlur={() => focusInput(null)}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
