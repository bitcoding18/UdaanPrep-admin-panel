import { useEffect, useMemo, useState } from "react";
import { createContext } from "react";

export const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [themeMode, setThemeMode] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const adminDataStr = localStorage.getItem("adminData") || null;
  
  const [adminData, setAdminData] = useState(
    adminDataStr ? JSON.parse(adminDataStr) : null
  );

  useEffect(() => {
    localStorage.setItem("adminData", JSON.stringify(adminData));
  }, [adminData]);

  const openNav = () => {
    setIsOpenNav(true);
  };

  const contextValue = useMemo(
    () => ({
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
      openNav,
      isOpenNav,
      setIsOpenNav,
      adminData,
      setAdminData,
    }),
    [
      isToggleSidebar,
      themeMode,
      isLogin,
      isHideSidebarAndHeader,
      windowWidth,
      isOpenNav,
      adminData,
    ]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
