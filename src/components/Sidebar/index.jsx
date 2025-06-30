import Button from "@mui/material/Button";
import { FaAngleRight, FaBell, FaCartArrowDown } from "react-icons/fa6";
import { MdDashboard, MdMessage } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { MyContext } from "../../App";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubMenu, setIsToggleSubMenu] = useState(false);
  const context = useContext(MyContext);

  const isOpenSubMenu = (index) => {
    setActiveTab(index);
    setIsToggleSubMenu(!isToggleSubMenu);
  };

  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 0 ? "active" : ""}`}
                onClick={() => isOpenSubMenu(0)}
              >
                <span className="icon">
                  <MdDashboard />
                </span>
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className={`w-100 ${
                activeTab === 1 && isToggleSubMenu === true ? "active" : ""
              }`}
              onClick={() => isOpenSubMenu(1)}
            >
              <span className="icon">
                <FaProductHunt />
              </span>
              Products
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${
                activeTab === 1 && isToggleSubMenu === true
                  ? "colapse"
                  : "colapsed"
              }`}
            >
              <ul className="submenu">
                <li>
                  <Link to="/products"> Product List</Link>{" "}
                </li>
                <li>
                  <Link to="/product/details"> Product View</Link>{" "}
                </li>
                <li>
                  <Link to="/product/upload"> Product Upload</Link>{" "}
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link to="/"></Link>
            <Button
              className={`w-100 ${
                activeTab === 2 && isToggleSubMenu === true
              } ? 'active' : ''`}
              onClick={() => isOpenSubMenu(2)}
            >
              <span className="icon">
                <FaCartArrowDown />
              </span>
              Orders
              <span className="arrow">
                <FaAngleRight />{" "}
              </span>
            </Button>
          </li>
          <li>
            <Link to="/"></Link>
            <Button
              className={`w-100 ${activeTab === 3} ? 'active' : ''`}
              onClick={() => isOpenSubMenu(3)}
            >
              <span className="icon">
                <MdMessage />
              </span>
              Messages
              <span className="arrow">
                <FaAngleRight />{" "}
              </span>
            </Button>
          </li>
          <li>
            <Link to="/"></Link>
            <Button
              className={`w-100 ${activeTab === 4} ? 'active' : ''`}
              onClick={() => isOpenSubMenu(4)}
            >
              <span className="icon">
                <FaBell />
              </span>
              Notifications
              <span className="arrow">
                <FaAngleRight />{" "}
              </span>
            </Button>
          </li>
          <li>
            <Link to="/"></Link>
            <Button
              className={`w-100 ${activeTab === 5} ? 'active' : ''`}
              onClick={() => isOpenSubMenu(5)}
            >
              <span className="icon">
                <IoIosSettings />
              </span>
              Settings
              <span className="arrow">
                <FaAngleRight />{" "}
              </span>
            </Button>
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 6} ? 'active' : ''`}
              onClick={() => isOpenSubMenu(6)}
            >
              <span className="icon">
                <MdDashboard />
              </span>
              Dashboard
              <span className="arrow">
                <FaAngleRight />{" "}
              </span>
            </Button>
          </li>
          <li>
            <Button
              className={`w-100 ${activeTab === 7} ? 'active' : ''`}
              onClick={() => isOpenSubMenu(7)}
            >
              <span className="icon">
                <FaProductHunt />
              </span>
              Products
              <span className="arrow">
                <FaAngleRight />{" "}
              </span>
            </Button>
          </li>
          <li>
            <Button
              className={`w-100 ${activeTab === 8} ? 'active' : ''`}
              onClick={() => isOpenSubMenu(8)}
            >
              <span className="icon">
                <FaCartArrowDown />
              </span>
              Orders
              <span className="arrow">
                <FaAngleRight />{" "}
              </span>
            </Button>
          </li>
          <li>
            <Button
              className={`w-100 ${activeTab === 9} ? 'active' : ''`}
              onClick={() => isOpenSubMenu(9)}
            >
              <span className="icon">
                <MdMessage />
              </span>
              Messages
              <span className="arrow">
                <FaAngleRight />{" "}
              </span>
            </Button>
          </li>
          <li>
            <Button
              className={`w-100 ${activeTab === 10} ? 'active' : ''`}
              onClick={() => isOpenSubMenu(10)}
            >
              <span className="icon">
                <FaBell />
              </span>
              Notifications
              <span className="arrow">
                <FaAngleRight />{" "}
              </span>
            </Button>
          </li>
          <li>
            <Button
              className={`w-100 ${activeTab === 11} ? 'active' : ''`}
              onClick={() => isOpenSubMenu(11)}
            >
              <span className="icon">
                <IoIosSettings />
              </span>
              Settings
              <span className="arrow">
                <FaAngleRight />{" "}
              </span>
            </Button>
          </li>
        </ul>

        <br />

        <div className="logoutWrapper">
          <div className="logoutBox">
            <Button variant="contained">
              <IoMdLogOut />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
