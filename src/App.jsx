import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./responsive.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { createContext, useContext } from "react";
import { useEffect } from "react";
import { GlobalContext } from "./context/globalProvider";
import PageRoutes from "./route";

const MyContext = createContext();

function App() {
  const contextData = useContext(GlobalContext);

  if (!contextData) {
    return null;
  }

  const {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader,
    themeMode,
    setThemeMode,
    windowWidth,
    setWindowWidth,
    isOpenNav,
    setIsOpenNav,
  } = contextData;

  useEffect(() => {
    if (themeMode === true) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("themeMode", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("themeMode", "dark");
    }
  }, [themeMode]);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin");
    setIsLogin(loginStatus === "true");
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        {!isHideSidebarAndHeader && <Header />}
        <div className="main d-flex">
          {!isHideSidebarAndHeader && (
            <>
              <div
                className={`sidebarOverlay d-none ${
                  isOpenNav === true && "show"
                }`}
                onClick={() => setIsOpenNav(false)}
              ></div>
              <div
                className={`sidebarWrapper ${
                  isToggleSidebar === true ? "toggle" : ""
                } ${isOpenNav === true ? "open" : ""}`}
              >
                <Sidebar />
              </div>
            </>
          )}
          <div
            className={`content ${isHideSidebarAndHeader && "full"} ${
              isToggleSidebar === true ? "toggle" : ""
            }`}
          >
            <PageRoutes />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
export { MyContext };
