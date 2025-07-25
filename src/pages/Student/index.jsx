import { Breadcrumbs, IconButton, TextField } from "@mui/material";
import { StyledBreadcrumb } from "../../utils/breadcrumbUtils";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Pagination from "@mui/material/Pagination";
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import CustomSwitch from "../../components/CustomSwitch";
import toast from "react-hot-toast";
import StudentFormModal from "./components/StudentFormModal";
import {
  changeStudentStatusAPI,
  deleteStudentAPI,
  getAllStudentsAPI,
  registerStudentAPI,
  updateStudentDetailsAPI,
} from "../../services/api-services/student-service";
import { DATE_FORMAT } from "../../constants";
import dayjs from "dayjs";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { IoMdPersonAdd } from "react-icons/io";
import { GlobalContext } from "../../context/globalProvider";
import SearchBox from "../../components/SearchBox";

const LIMIT = 4;
const Student = () => {
  const context = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [arrStudents, setArrStudents] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(LIMIT);
  const [totalStudents, setTotalStudents] = useState(0);
  const [studentsDataPerPage, setStudentsDataPerPage] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [isFrom, setIsFrom] = useState("");

  useEffect(() => {
    getStudentsList(currentPageNumber, limit);
  }, []);

  const getStudentsList = async (page, limit, searchValue = "") => {
    const response = await toast.promise(
      getAllStudentsAPI(page, limit, searchValue),
      {
        loading: "Getting student list...",
        success: (res) => `Student list fetched successfully!`,
        error: (err) => `${err.message || "Something went wrong."}`,
      }
    );
    setArrStudents(response?.data?.students || []);
    setTotalStudents(response?.data?.pagination?.total || 0);
    setTotalPages(response?.data?.pagination?.totalPages);
    setCurrentPageNumber(response?.data?.pagination?.page || 1);
    setStudentsDataPerPage(response?.data?.students?.length || 0);
  };

  const handleAddStudent = () => {
    setIsFrom("add");
    setEditData(null);
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setIsFrom("edit");
    setEditData(student);
    setShowModal(true);    
  };

  const handleDeleteStudent = async (student) => {
    setShowConfirm(true);
    setStudentIdToDelete(student?.student_id);
  };

  const handleSubmit = async (data) => {
    console.log('asdfdsf', data);
    
    const bodyReq = {
      name: data?.name,
      email: data?.email,
      phone: data?.mobile || data?.phone || "",
      password: data?.password,
      birthdate: data?.birthdate || "",
      status: data?.status ? "active" : "inactive",
    };
    console.log('asdfasdf', bodyReq);
    
    // let response = null;
    // if (editData) {
    //   response = await toast.promise(
    //     updateStudentDetailsAPI(data?.student_id, bodyReq),
    //     {
    //       loading: "Updating new student...",
    //       success: (res) => `${res?.data?.name} updated successfully!`,
    //       error: (err) => `${err?.message || "Something went wrong."}`,
    //     }
    //   );
    // } else {
    //   response = await toast.promise(registerStudentAPI(bodyReq), {
    //     loading: "Adding new student...",
    //     success: (res) => `${res?.data?.name} added successfully!`,
    //     error: (err) => `${err.message || "Something went wrong."}`,
    //   });
    // }
    // if (response?.statusCode === 200) {
    //   getStudentsList(currentPageNumber, limit);
    // }
  };

  const handleConfirmDelete = async () => {
    if (!studentIdToDelete) {
      toast.error("No student ID to delete.");
      return;
    }
    try {
      setShowConfirm(false);
      const response = await toast.promise(
        deleteStudentAPI(studentIdToDelete),
        {
          loading: "Deleting student...",
          success: (res) => `Student deleted successfully!`,
          error: (err) => `${err.message || "Something went wrong."}`,
        }
      );
      if (response?.statusCode === 200) {
        setStudentIdToDelete(null);
        getStudentsList(1, limit);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error(error.message || "Something went wrong.");
    }
  };

  const onHandleStatusChange = async (studentId, newStatus) => {
    if (!studentId) {
      toast.error("No student ID to found.");
      return;
    }
    try {
      setShowConfirm(false);
      const response = await toast.promise(changeStudentStatusAPI(studentId), {
        loading: "Updating student status...",
        success: (res) => `Student status updated successfully!`,
        error: (err) => `${err.message || "Something went wrong."}`,
      });
      if (response?.statusCode === 200) {
        console.log("Status change response:", response);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error(error.message || "Something went wrong.");
    }
  };

  const onSearchValueSubmit = (value) => {
    setSearchVal(value);
    if (value !== "") {
      setCurrentPageNumber(1);
      getStudentsList(1, limit, value);
    } else {
      getStudentsList(1, limit);
    }
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Students Management</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb
              label="Students Management"
              href="#"
              component="a"
            />
          </Breadcrumbs>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Students Users List</h3>

          <div className="row cardFilters mt-3 d-flex  justify-content-between">
            <div className="col-md-7 d-flex flex-row">
              <div className="col-md-10">
                <SearchBox onSubmit={onSearchValueSubmit} />
              </div>
            </div>
            <div className="col-md-3 d-flex flex-column align-items-end">
              <div className="h-50"></div>
              <FormControl size="small" className="align-self-end">
                <Button variant="contained" onClick={handleAddStudent}>
                  <IoMdPersonAdd size={20} /> &nbsp; Add New Student
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
                  <th>DATE OF BIRTH</th>
                  <th>REGISTRATION DATE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {arrStudents.map((student, index) => {
                  return (
                    <StudentUserRow
                      key={student.id}
                      student={student}
                      index={index}
                      handleEditStudent={handleEditStudent}
                      handleDeleteStudent={handleDeleteStudent}
                      onToggle={onHandleStatusChange}
                    />
                  );
                })}
              </tbody>
            </table>

            <div className="d-flex tableFooter">
              <p>
                showing <b>{studentsDataPerPage}</b> of <b>{totalStudents}</b>{" "}
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
                  getStudentsList(value, limit, searchVal);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <StudentFormModal
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
          "Do you really want to delete this student? This action cannot be undo."
        }
      />
    </>
  );
};

export default Student;

const StudentUserRow = React.memo(
  ({ student, index, onToggle, handleEditStudent, handleDeleteStudent }) => {
    const [status, setStatus] = useState(student?.status); // initial value

    const handleToggle = (value) => {
      setStatus(value);
      onToggle(student.student_id, value);
    };

    return (
      <tr className={index % 2 === 0 ? "even" : "odd"}>
        <td>{student?.id}</td>
        <td>{student?.name}</td>
        <td>{student?.email}</td>
        <td>{student?.phone}</td>
        <td>
          {student?.birthdate
            ? dayjs(student?.birthdate).format(DATE_FORMAT)
            : "-"}
        </td>
        <td>{student?.registrationDate}</td>
        <td>
          <CustomSwitch
            checked={status}
            onChange={(e, value) => handleToggle(value)}
          />
        </td>
        <td>
          <div className="actions d-flex align-items-center">
            <Link to="/student/details">
              <Button className="secondary" color={"secondary"}>
                <FaEye />
              </Button>
            </Link>
            <Button
              className="success"
              color="success"
              onClick={() => handleEditStudent(student)}
            >
              <FaPencilAlt />
            </Button>
            <Button
              className="error"
              color="error"
              onClick={() => handleDeleteStudent(student)}
            >
              <MdDelete />
            </Button>
          </div>
        </td>
      </tr>
    );
  }
);
