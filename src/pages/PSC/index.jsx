import { Breadcrumbs, IconButton, TextField } from "@mui/material";
import { StyledBreadcrumb } from "../../utils/breadcrumbUtils";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Pagination from "@mui/material/Pagination";
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalProvider";
import React, { useContext, useEffect, useState } from "react";
import CustomSwitch from "../../components/CustomSwitch";
import toast from "react-hot-toast";
import {
  changePSCstatusAPI,
  deletePSCAPI,
  getAllPSCAPI,
  updatePSCDetailsAPI,
} from "../../services/api-services/psc-service";
import { DATE_TIME_FORMAT } from "../../constants";
import dayjs from "dayjs";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { IoIosAddCircle } from "react-icons/io";

const LIMIT = 4;
const PSC = () => {
  const context = useContext(GlobalContext);
  const [editData, setEditData] = useState(null);
  const [arrPSC, setArrPSC] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pscIdToDelete, setPSCIdToDelete] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(LIMIT);
  const [totalPSC, setTotalPSC] = useState(0);
  const [PSCDataPerPage, setPSCDataPerPage] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getPSCList(currentPageNumber, limit);
  }, []);

  const getPSCList = async (page, limit) => {
    const response = await toast.promise(getAllPSCAPI(page, limit, searchVal), {
      loading: "Getting psc list...",
      success: (res) => `PSC list fetched successfully!`,
      error: (err) => `${err.message || "Something went wrong."}`,
    });
    console.log("response", response);
    setArrPSC(response?.data?.docs || []);
    setTotalPSC(response?.data?.totalDocs || 0);
    setTotalPages(response?.data?.totalPages);
    setCurrentPageNumber(response?.data?.page || 1);
    setPSCDataPerPage(response?.data?.docs?.length || 0);
  };

  const handleAddPSC = () => {
    navigate("/psc/details");
  };

  const handleEditPSC = (psc) => {
    setEditData(psc);
    navigate(`/psc/details/${psc?._id}`);
  };

  const handleDeletePSC = async (psc) => {
    setShowConfirm(true);
    setPSCIdToDelete(psc?._id);
  };

  const handleSubmit = async (data) => {
    const bodyReq = {
      name: data?.name,
      email: data?.email,
      phone: data?.mobile || data?.phone || "",
      password: data?.password,
      birthdate: data?.birthdate || "",
      status: data?.status ? "active" : "inactive",
    };
    let response = null;
    if (editData) {
      console.log("Update PSC:", data);
      response = await toast.promise(
        updatePSCDetailsAPI(data?._id, bodyReq),
        {
          loading: "Updating new psc...",
          success: (res) => `${data?.name} updated successfully!`,
          error: (err) => `${err.message || "Something went wrong."}`,
        }
      );
      console.log("psc updated response", response);
    } else {
      console.log("Add Psc:", data);
      response = await toast.promise(registerStudentAPI(bodyReq), {
        loading: "Adding new psc...",
        success: (res) => `${data?.name} added successfully!`,
        error: (err) => `${err.message || "Something went wrong."}`,
      });
    }
    if (response?.statusCode === 200) {
      getPSCList(currentPageNumber, limit);
    }
  };

  const handleConfirmDelete = async () => {
    if (!pscIdToDelete) {
      toast.error("No psc ID to delete.");
      return;
    }
    try {
      setShowConfirm(false);
      const response = await toast.promise(deletePSCAPI(pscIdToDelete), {
        loading: "Deleting psc...",
        success: (res) => `PSC deleted successfully!`,
        error: (err) => `${err.message || "Something went wrong."}`,
      });
      if (response?.statusCode === 200) {
        setPSCIdToDelete(null);
        getPSCList(currentPageNumber, limit);
      }
    } catch (error) {
      console.error("Error deleting psc:", error);
      toast.error(error.message || "Something went wrong.");
    }
  };

  const onHandleStatusChange = async (pscId, newStatus) => {
    console.log("Status changed for ID:", pscId, "New Status:", newStatus);
    if (!pscId) {
      toast.error("No PSC ID to found.");
      return;
    }
    try {
      setShowConfirm(false);
      const response = await toast.promise(changePSCstatusAPI(pscId), {
        loading: "Updating psc status...",
        success: (res) => `PSC status updated successfully!`,
        error: (err) => `${err.message || "Something went wrong."}`,
      });
      if (response?.statusCode === 200) {
        console.log("Status change response:", response);
      }
    } catch (error) {
      console.error("Error deleting psc:", error);
      toast.error(error.message || "Something went wrong.");
    }
  };

  const onSearchValueSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.value.trim();
    if (searchValue !== "") {
      setSearchVal(searchValue);
      setCurrentPageNumber(1);
      getStudentsList(1, limit, searchValue);
    } else {
      setSearchVal("");
      getStudentsList(1, limit);
    }
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">PSC Management</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb
              label="PSC Management"
              href="#"
              component="a"
            />
          </Breadcrumbs>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">PSC List</h3>

          <div className="row cardFilters mt-3 d-flex justify-content-between">
            <div className="col-md-5 d-flex flex-row">
              <div className="col-md-10">
                <FormControl size="small" className="w-100">
                  <TextField
                    label="Search PSC"
                    slotProps={{
                      input: {
                        type: "search",
                        onKeyDown: (e) => {
                          if (e.key === "Enter") {
                            onSearchValueSubmit(e);
                          }
                        },
                      },
                      endAdornment: {
                        children: (
                          <IconButton onClick={onSearchValueSubmit}>
                            <MdDelete />
                          </IconButton>
                        ),
                      },
                    }}
                    onBlur={(e) => onSearchValueSubmit(e)}
                    className="search-input"
                  />
                </FormControl>
              </div>
            </div>
            <div className="col-md-3 d-flex flex-column align-items-end">
              <div className="h-50"></div>
              <FormControl size="small" className="align-self-end">
                <Button
                  variant="contained"
                  onClick={handleAddPSC}
                  className="d-flex justify-content-center align-items-center"
                >
                  <IoIosAddCircle size={20} /> &nbsp; Add New PSC
                </Button>
              </FormControl>
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th style={{ width: "300px" }}>PSC NAME</th>
                  <th>FEATURED</th>
                  <th>PRIORITY</th>
                  <th>IMAGE</th>
                  <th>CREATED DATE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {arrPSC.map((psc, index) => {
                  return (
                    <PSCRow
                      key={psc._id}
                      psc={psc}
                      index={index}
                      handleEditPSC={handleEditPSC}
                      handleDeletePSC={handleDeletePSC}
                      onToggle={onHandleStatusChange}
                    />
                  );
                })}
              </tbody>
            </table>

            <div className="d-flex tableFooter">
              <p>
                showing <b>{PSCDataPerPage}</b> of <b>{totalPSC}</b>{" "}
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
                  getStudentsList(value, limit);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title={'Are you sure?'}
        message={'Do you really want to delete this PSC? This action cannot be undo.'}
      />
    </>
  );
};

export default PSC;

const PSCRow = React.memo(
  ({ psc, index, onToggle, handleEditPSC, handleDeletePSC }) => {
    const [status, setStatus] = useState(psc?.is_active);

    const handleToggle = (value) => {
      setStatus(value);
      onToggle(psc._id, value);
    };

    return (
      <tr className={index % 2 === 0 ? "even" : "odd"}>
        <td>{index + 1}</td>
        <td>{psc?.name}</td>
        <td>{`${psc?.featured ? "Yes" : "No"}` || psc?.featured}</td>
        <td>{psc?.priority}</td>
        <td>
          <img
            alt="PSC"
            src={`https://drive.google.com/thumbnail?id=${psc?.image_id}`}
            className="course-image"
          />
        </td>
        <td>{dayjs(psc?.createdAt).format(DATE_TIME_FORMAT) || "-"}</td>
        <td>
          <CustomSwitch
            checked={status}
            onChange={(e, value) => handleToggle(value)}
          />
        </td>
        <td>
          <div className="actions d-flex align-items-center">
            <Link to="/psc/details">
              <Button className="secondary" color={"secondary"}>
                <FaEye />
              </Button>
            </Link>
            <Button
              className="success"
              color="success"
              onClick={() => handleEditPSC(psc)}
            >
              <FaPencilAlt />
            </Button>
            <Button
              className="error"
              color="error"
              onClick={() => handleDeletePSC(psc)}
            >
              <MdDelete />
            </Button>
          </div>
        </td>
      </tr>
    );
  }
);
