import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/transparent_logo.png";
import Button from "@mui/material/Button";
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import SearchBox from "../SearchBox";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineLightMode } from "react-icons/md";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { FaShieldAlt } from "react-icons/fa";
import UserAvatarImgComponent from "../userAvatarImg";
import { IoMenu } from "react-icons/io5";
import { notifications } from "../../constants";
import { GlobalContext } from "../../context/globalProvider";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotificationDrop, setIsOpenNotificationDrop] = useState(null);
  const openMyAcc = Boolean(anchorEl);
  const openNotifications = Boolean(isOpenNotificationDrop);
  const context = useContext(GlobalContext);
  const { adminData } = context;
  const navigate = useNavigate();

  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  const handleOpenNotficationsDrop = () => {
    setIsOpenNotificationDrop(true);
  };

  const handleCloseNotficationsDrop = () => {
    setIsOpenNotificationDrop(false);
  };

  const handleLogoutAction = () => {
    // Handle logout logic here
    console.log("User logged out");
    handleCloseMyAccDrop();
    context.setIsLogin(false);
    navigate("/login");
  };

  return (
    <>
      <header className="d-flex align-item-center">
        <div className="container-fluid w-100">
          <div className="row d-flex align-item-center w-100">
            {/* Logo Warapper */}
            <div className="col-sm-2 part1">
              <Link to={"/"} className="d-flex align-items-center logo">
                <img src={logo} />
                <span className="ms-2">UdaanPrep</span>
              </Link>
            </div>

            {context.windowWidth > 992 && (
              <div className="col-sm-3 d-flex align-items-center part2 res-hide">
                <Button
                  className="rounded-circle"
                  onClick={() =>
                    context.setIsToggleSidebar(!context.isToggleSidebar)
                  }
                >
                  {context.isToggleSidebar ? <MdOutlineMenu /> : <MdMenuOpen />}
                </Button>
                <SearchBox />
              </div>
            )}

            <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
              <Button
                className="rounded-circle me-3"
                onClick={() => context.setThemeMode(!context.themeMode)}
              >
                <MdOutlineLightMode />
              </Button>

              <div className="dropdownWrapper position-relative">
                {context.windowWidth > 992 && <Button
                  className="rounded-circle me-3"
                  onClick={handleOpenNotficationsDrop}
                >
                  <FaRegBell />
                </Button>}

                {context.windowWidth < 992 && (
                  <Button
                    className="rounded-circle me-3"
                    onClick={() => context.openNav()}
                  >
                    <IoMenu />
                  </Button>
                )}

                <Menu
                  anchorEl={isOpenNotificationDrop}
                  className="notifications dropdown_list"
                  id="notifications"
                  open={openNotifications}
                  onClose={handleCloseNotficationsDrop}
                  onClick={handleCloseNotficationsDrop}
                  transformOrigin={{ horizontal: "right", vertical: "bottom" }}
                  anchorOrigin={{ horizontal: "right", vertical: "top" }}
                >
                  <div className="head ps-3 pb-2">
                    <h4>Notifications (12)</h4>
                  </div>

                  <Divider className="mb-1" />
                  <div className="scroll">
                    {notifications.map((notification, index) => (
                      <MenuItem key={index} onClick={handleOpenMyAccDrop}>
                        <div className="d-flex">
                          <div>
                            <UserAvatarImgComponent img={notification.image} />
                          </div>
                          <div className="dropdownInfo">
                            <h4>
                              <span>
                                <b>{notification.name}</b>
                                {notification.message}
                              </span>
                            </h4>
                            <p className="text-sky mb-0">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </MenuItem>
                    ))}
                    
                  </div>

                  <div className="ps-3 pe-3 w-100 pt-3 pb-1">
                    <Button className="btn-blue w-100">
                      View all notifications
                    </Button>
                  </div>
                </Menu>
              </div>

              {context?.isLogin !== true ? (
                <Link to={"./login"}>
                  <Button className="btn-blue btn-lg btn-round">Sign In</Button>
                </Link>
              ) : (
                <div className="myAccWrapper">
                  <Button
                    className="myAcc d-flex align-items-center"
                    onClick={handleOpenMyAccDrop}
                  >
                    <div className="userImg">
                      <span className="rounded-circle">
                        <img
                          src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                          alt="User"
                        />
                      </span>
                    </div>

                    <div className="userInfo res-hide">
                      <h4>{adminData?.name || 'Admin'}</h4>
                      <p className="mb-0 text-lowercase">{adminData?.email || 'admin@gmail.com'}</p>
                    </div>
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openMyAcc}
                    onClose={handleCloseMyAccDrop}
                    onClick={handleCloseMyAccDrop}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Divider />
                    <MenuItem onClick={handleOpenMyAccDrop}>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      My Account
                    </MenuItem>
                    <MenuItem onClick={handleOpenMyAccDrop}>
                      <ListItemIcon>
                        <FaShieldAlt fontSize="small" />
                      </ListItemIcon>
                      Reset Password
                    </MenuItem>
                    <MenuItem onClick={handleLogoutAction}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
