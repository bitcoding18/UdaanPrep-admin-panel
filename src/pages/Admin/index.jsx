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
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/globalProvider";
import React, { useContext, useEffect, useState } from "react";
import CustomSwitch from "../../components/CustomSwitch";
import AdminFormModal from "./components/AdminFormModal";
import {
  registerAdminAPI,
  getAllAdminsAPI,
  changeAdminStatusAPI,
  deleteAdminAccountAPI,
} from "../../services/api-services/auth";
import toast from "react-hot-toast";
import SearchBox from "../../components/SearchBox";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

const LIMIT = 4;
const Admin = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [names, setNames] = useState([]);
  const [emails, setEmails] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  const open = Boolean(anchorEl);
  const context = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [arrAdmins, setArrAdmins] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [adminIdToDelete, setAdminIdToDelete] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(LIMIT);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [adminsDataPerPage, setAdminsDataPerPage] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [isFrom, setIsFrom] = useState("");

  useEffect(() => {
    getAdminsList(currentPageNumber, limit);
  }, []);

  const getAdminsList = async (page, limit, searchValue = "") => {
    const response = await toast.promise(
      getAllAdminsAPI(page, limit, searchValue),
      {
        loading: "Getting admin list...",
        success: (res) => `Admin list fetched successfully!`,
        error: (err) => `${err.message || "Something went wrong."}`,
      }
    );
    setArrAdmins(response?.data?.admins || []);
    setTotalAdmins(response?.data?.pagination?.total || 0);
    setTotalPages(response?.data?.pagination?.totalPages);
    setCurrentPageNumber(response?.data?.pagination?.page || 1);
    setAdminsDataPerPage(response?.data?.admins?.length || 0);
  };

  const handleAddAdmin = () => {
    setIsFrom("add");
    setEditData(null);
    setShowModal(true);
  };

  const handleEditAdmin = (admin) => {
    setIsFrom("edit");
    setEditData(admin);
    setShowModal(true);
  };

  const handleShowAdmin = (admin) => {
    setIsFrom("show");
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
        mobile: data?.mobile,
        password: data?.password,
        repeatPassword: data?.password,
        admin_type: data?.role,
      };
      const response = await toast.promise(registerAdminAPI(bodyReq), {
        loading: "Adding new admin...",
        success: (res) => `${data?.name} added successfully!`,
        error: (err) => `${err.message || "Something went wrong."}`,
      });
      if (response?.statusCode === 200) {
        getAdminsList(1, limit);
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (!adminIdToDelete) {
      toast.error("No admin ID to found.");
      return;
    }
    try {
      setShowConfirm(false);
      const response = await toast.promise(
        deleteAdminAccountAPI(adminIdToDelete),
        {
          loading: "Deleting admin...",
          success: (res) => `Admin deleted successfully!`,
          error: (err) => `${err.message || "Something went wrong."}`,
        }
      );
      if (response?.statusCode === 200) {
        setAdminIdToDelete(null);
        getAdminsList(1, limit);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  const onSearchValueSubmit = (value) => {
    const searchValue = value.trim();
    if (searchValue !== "") {
      setSearchVal(searchValue);
      setCurrentPageNumber(1);
      getAdminsList(1, limit, searchValue);
    } else {
      setSearchVal("");
      getAdminsList(1, limit);
    }
  };

  const onHandleStatusChange = async (adminId, newStatus) => {
    if (!adminId) {
      toast.error("No admin ID to found.");
      return;
    }
    try {
      setShowConfirm(false);
      const response = await toast.promise(changeAdminStatusAPI(adminId), {
        loading: "Updating admin status...",
        success: (res) => `Admin status updated successfully!`,
        error: (err) => `${err.message || "Something went wrong."}`,
      });
      if (response?.statusCode === 200) {
        console.log("Status change response:", response);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  const handleDeleteAdmin = async (admin) => {
    setShowConfirm(true);
    setAdminIdToDelete(admin?.id);
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
            <div className="col-md-7 d-flex flex-row">
              <div className="col-md-10">
                <SearchBox onSubmit={(value) => onSearchValueSubmit(value)} />
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
                {arrAdmins.map((admin, index) => {
                  return (
                    <AdminUserRow
                      key={admin.id}
                      admin={admin}
                      index={index}
                      handleEditAdmin={handleEditAdmin}
                      onToggle={onHandleStatusChange}
                      handleShowAdmin={handleShowAdmin}
                      handleDeleteAdmin={handleDeleteAdmin}
                    />
                  );
                })}
              </tbody>
            </table>

            <div className="d-flex tableFooter">
              <p>
                showing <b>{adminsDataPerPage}</b> of <b>{totalAdmins}</b>{" "}
                results{" "}
              </p>
              <Pagination
                count={Math.ceil(totalPages)}
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
                page={currentPageNumber}
                onChange={(e, value) => {
                  setCurrentPageNumber(value);
                  getAdminsList(value, limit, searchVal);
                }}
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
        isFrom={isFrom}
      />

      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title={"Are you sure?"}
        message={
          "Do you really want to delete this admin? This action cannot be undo."
        }
      />
    </>
  );
};

export default Admin;

const AdminUserRow = React.memo(
  ({
    admin,
    index,
    onToggle,
    handleEditAdmin,
    handleShowAdmin,
    handleDeleteAdmin,
  }) => {
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
        <td>{admin?.mobile}</td>
        <td>{admin?.registration_date}</td>
        <td>
          <CustomSwitch
            checked={status}
            onChange={(e, value) => handleToggle(value)}
          />
        </td>
        <td>
          <div className="actions d-flex align-items-center">
            <Button
              className="secondary"
              color={"secondary"}
              onClick={() => handleShowAdmin(admin)}
            >
              <FaEye />
            </Button>
            <Button
              className="success"
              color="success"
              onClick={() => handleEditAdmin(admin)}
            >
              <FaPencilAlt />
            </Button>
            <Button
              className="error"
              color="error"
              onClick={() => handleDeleteAdmin(admin)}
            >
              <MdDelete />
            </Button>
          </div>
        </td>
      </tr>
    );
  }
);
