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
import { GlobalContext } from "../../context/globalProvider";
import React, { useContext, useEffect, useState } from "react";
import CustomSwitch from "../../components/CustomSwitch";
import toast from "react-hot-toast";
import {
  changeStudentStatusAPI,
  deleteStudentAPI,
  getAllCoursesAPI,
  registerStudentAPI,
  updateStudentDetailsAPI,
} from "../../services/api-services/course-service";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../../constants";
import dayjs from "dayjs";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { IoIosAddCircle } from "react-icons/io";

const LIMIT = 4;
const Courses = () => {
  const context = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [arrCourses, setArrCourses] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [courseIdToDelete, setCoursetIdToDelete] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(LIMIT);
  const [totalCourses, setTotalCourses] = useState(0);
  const [coursesDataPerPage, setCoursesDataPerPage] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    getCourseList(currentPageNumber, limit);
  }, []);

  const getCourseList = async (page, limit) => {
    const response = await toast.promise(getAllCoursesAPI(page, limit), {
      loading: "Getting course list...",
      success: (res) => `Course list fetched successfully!`,
      error: (err) => `${err.message || "Something went wrong."}`,
    });
    console.log("response", response);
    setArrCourses(response?.data?.docs || []);
    setTotalCourses(response?.data?.totalDocs || 0);
    setTotalPages(response?.data?.totalPages);
    setCurrentPageNumber(response?.data?.page || 1);
    setCoursesDataPerPage(response?.data?.docs?.length || 0);
  };

  const handleAddStudent = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleEditCourse = (student) => {
    setEditData(student);
    setShowModal(true);
  };

  const handleDeleteCourse = async (student) => {
    setShowConfirm(true);
    setCoursetIdToDelete(student?.student_id);
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
      console.log("Update Student:", data);
      response = await toast.promise(
        updateStudentDetailsAPI(data?.student_id, bodyReq),
        {
          loading: "Updating new student...",
          success: (res) => `${data?.name} updated successfully!`,
          error: (err) => `${err.message || "Something went wrong."}`,
        }
      );
      console.log("student updated response", response);
    } else {
      console.log("Add Student:", data);
      response = await toast.promise(registerStudentAPI(bodyReq), {
        loading: "Adding new student...",
        success: (res) => `${data?.name} added successfully!`,
        error: (err) => `${err.message || "Something went wrong."}`,
      });
    }
    if (response?.statusCode === 200) {
      getStudentsList(currentPageNumber, limit);
    }
  };

  const handleConfirmDelete = async () => {
    if (!courseIdToDelete) {
      toast.error("No student ID to delete.");
      return;
    }
    try {
      setShowConfirm(false);
      const response = await toast.promise(deleteStudentAPI(courseIdToDelete), {
        loading: "Deleting student...",
        success: (res) => `Student deleted successfully!`,
        error: (err) => `${err.message || "Something went wrong."}`,
      });
      if (response?.statusCode === 200) {
        setCoursetIdToDelete(null);
        getStudentsList(currentPageNumber, limit);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error(error.message || "Something went wrong.");
    }
  };

  const onHandleStatusChange = async (studentId, newStatus) => {
    console.log("Status changed for ID:", studentId, "New Status:", newStatus);
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
          <h5 className="mb-0">Course Management</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb
              label="Course Management"
              href="#"
              component="a"
            />
          </Breadcrumbs>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Courses List</h3>

          <div className="row cardFilters mt-3 d-flex justify-content-between">
            <div className="col-md-5 d-flex flex-row">
              <div className="col-md-10">
                <FormControl size="small" className="w-100">
                  <TextField
                    label="Search Course"
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
                  onClick={handleAddStudent}
                  className="d-flex justify-content-center align-items-center"
                >
                  <IoIosAddCircle size={20} /> &nbsp; Add New Course
                </Button>
              </FormControl>
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th style={{ width: "300px" }}>COURSE NAME</th>
                  <th>FEATURED</th>
                  <th>PRIORITY</th>
                  <th>IMAGE</th>
                  <th>CREATED DATE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {arrCourses.map((course, index) => {
                  return (
                    <CoursesRow
                      key={course._id}
                      course={course}
                      index={index}
                      handleEditCourse={handleEditCourse}
                      handleDeleteCourse={handleDeleteCourse}
                      onToggle={onHandleStatusChange}
                    />
                  );
                })}
              </tbody>
            </table>

            <div className="d-flex tableFooter">
              <p>
                showing <b>{coursesDataPerPage}</b> of <b>{totalCourses}</b>{" "}
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
      />
    </>
  );
};

export default Courses;

const CoursesRow = React.memo(
  ({ course, index, onToggle, handleEditCourse, handleDeleteCourse }) => {
    const [status, setStatus] = useState(course?.status);

    const handleToggle = (value) => {
      setStatus(value);
      onToggle(course._id, value);
    };

    return (
      <tr className={index % 2 === 0 ? "even" : "odd"}>
        <td>{index + 1}</td>
        <td>{course?.name}</td>
        <td>{`${course?.featured ? "Yes" : "No"}` || course?.featured}</td>
        <td>{course?.priority}</td>
        <td>
          <img
            alt="Course"
            src={`https://drive.google.com/thumbnail?id=${course?.image_id}`}
            className="course-image"
          />
        </td>
        <td>{dayjs(course?.createdAt).format(DATE_TIME_FORMAT) || "-"}</td>
        <td>
          <CustomSwitch
            checked={status}
            onChange={(e, value) => handleToggle(value)}
          />
        </td>
        <td>
          <div className="actions d-flex align-items-center">
            <Link to="/course/details">
              <Button className="secondary" color={"secondary"}>
                <FaEye />
              </Button>
            </Link>
            <Button
              className="success"
              color="success"
              onClick={() => handleEditCourse(student)}
            >
              <FaPencilAlt />
            </Button>
            <Button
              className="error"
              color="error"
              onClick={() => handleDeleteCourse(student)}
            >
              <MdDelete />
            </Button>
          </div>
        </td>
      </tr>
    );
  }
);
