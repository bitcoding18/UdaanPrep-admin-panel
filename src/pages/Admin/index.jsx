import { Breadcrumbs, Checkbox, ListItemText } from "@mui/material";
import { StyledBreadcrumb } from "../../utils/breadcrumbUtils";
import HomeIcon from "@mui/icons-material/Home";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { Select } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { adminUsers, products } from "../../constants";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/globalProvider";
import React, { useContext, useState } from "react";
import CustomSwitch from "../../components/CustomSwitch";
import AdminFormModal from "./components/AdminFormModal";
import { registerAdminAPI } from "../../services/api-services/auth";
import toast from "react-hot-toast";

const Admin = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [names, setNames] = useState([]);
  const [emails, setEmails] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  const open = Boolean(anchorEl);
  const context = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleToggle = (event) => {
    setStatus(event.target.checked);
    console.log("Switch is now:", event.target.checked);
  };

  const handleAddAdmin = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleEditAdmin = (admin) => {
    setEditData(admin);
    setShowModal(true);
  };

  const handleSubmit = async (data) => {
    if (editData) {
      console.log("Update Admin:", data);
      // Call update API here
    } else {
      console.log("Add Student:", data);
      const bodyReq = {
        name: data?.name,
        email: data?.email,
        phone: data?.mobile,
        password: data?.password,
        repeatPassword: data?.password
      };
      const response = await toast.promise(registerAdminAPI(bodyReq), {
        loading: "Adding new admin...",
        success: (res) => `${data?.name} added successfully!`,
        error: (err) => `${err.message || "Something went wrong."}`,
      });
      if (response?.statusCode === 200) {
        // call get admin list api
        console.log('call get admin list api');
        
      }      
    }
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Admin Management</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="Admin Management" href="#" component="a" />
          </Breadcrumbs>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Admin Users List</h3>

          <div className="row cardFilters mt-3 d-flex justify-content-between">
            <div className="col-md-3 d-flex flex-row">
              <div className="col-md-10">
                <h4>Name</h4>
                <FormControl size="small" className="w-100">
                  <Select
                    multiple
                    value={names}
                    onChange={(e) => setNames(e.target.value)}
                    renderValue={(selected) => selected.join(", ")}
                    className="w-100"
                  >
                    {["Rakesh", "Akshay", "Vishal", "Aditya", "Bhavik"].map(
                      (nameItem) => (
                        <MenuItem key={nameItem} value={nameItem}>
                          <Checkbox checked={names.indexOf(nameItem) > -1} />
                          <ListItemText primary={nameItem} />
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-12  ms-4">
                <h4>Email</h4>
                <FormControl size="small" className="w-100">
                  <Select
                    multiple
                    value={emails}
                    onChange={(e) => setEmails(e.target.value)}
                    renderValue={(selected) => selected.join(", ")}
                    className="w-100"
                  >
                    {[
                      "rakesh@gmail.com",
                      "akshay@gmail.com",
                      "vishal@gmail.com",
                      "aditya@gmail.com",
                      "bhavik@gmail.com",
                    ].map((emailItem) => (
                      <MenuItem key={emailItem} value={emailItem}>
                        <Checkbox checked={emails.indexOf(emailItem) > -1} />
                        <ListItemText primary={emailItem} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="col-md-3 d-flex flex-column align-items-end">
              <div className="h-50"></div>
              <FormControl size="small" className="align-self-end">
                <Button variant="contained" onClick={handleAddAdmin}>
                  Add New Admin
                </Button>
              </FormControl>
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th style={{ width: "300px" }}>NAME</th>
                  <th>EMAIL</th>
                  <th>MOBILE</th>
                  <th>REGISTRATION DATE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {adminUsers.map((admin, index) => {
                  return (
                    <AdminUserRow
                      key={admin.id}
                      admin={admin}
                      index={index}
                      handleEditAdmin={handleEditAdmin}
                      onToggle={(id, newStatus) => {
                        console.log(
                          "Toggled ID:",
                          id,
                          "New Status:",
                          newStatus
                        );
                      }}
                    />
                  );
                })}
              </tbody>
            </table>

            <div className="d-flex tableFooter">
              <p>
                showing <b>12</b> of <b>60</b> results{" "}
              </p>
              <Pagination
                count={100}
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
              />
            </div>
          </div>
        </div>
      </div>

      <AdminFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
        initialData={editData}
      />
    </>
  );
};

export default Admin;

const AdminUserRow = React.memo(({ admin, index, onToggle, handleEditAdmin }) => {
  const [status, setStatus] = useState(admin?.status); // initial value

  const handleToggle = (value) => {
    setStatus(value);
    onToggle(admin.id, value);
  };

  return (
    <tr className={index % 2 === 0 ? "even" : "odd"}>
      <td>{admin?.id}</td>
      <td>{admin?.name}</td>
      <td>{admin?.email}</td>
      <td>{admin?.phone}</td>
      <td>{admin?.registrationDate}</td>
      <td>
        <CustomSwitch
          checked={status}
          onChange={(e, value) => handleToggle(value)}
        />
      </td>
      <td>
        <div className="actions d-flex align-items-center">
          <Link to="/product/details">
            <Button className="secondary" color={"secondary"}>
              <FaEye />
            </Button>
          </Link>
          <Button className="success" color="success" onClick={() => handleEditAdmin(admin)}>
            <FaPencilAlt />
          </Button>
          <Button className="error" color="error">
            <MdDelete />
          </Button>
        </div>
      </td>
    </tr>
  );
});
