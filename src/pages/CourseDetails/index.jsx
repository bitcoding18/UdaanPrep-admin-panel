import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { StyledBreadcrumb } from "../../utils/breadcrumbUtils";
import { GlobalContext } from "../../context/globalProvider";
import { Button, MenuItem, Select } from "@mui/material";
import FileUpload from "../../components/FileUpload";
import toast from "react-hot-toast";
import { createCourseAPI } from "../../services/api-services/course-service";
import { base64ToFile } from "../../utils/commonFunctions";
import { getAllPSCAPI } from "../../services/api-services/psc-service";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetails = () => {
  const context = useContext(GlobalContext);
  const { themeMode } = context;
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [selectedPSC, setSelectedPSC] = React.useState("");
  const [featured, setFeatured] = React.useState("");
  const [courseImg, setCourseImg] = React.useState(null);
  const [arrPSCList, setArrPSCList] = React.useState([]);
  const params = useParams();
  const courseId = params?.id || null;
  const navigate = useNavigate();

  useEffect(() => {
    getPSCList();
    fetchCourseDetails();
  }, []);

  const getPSCList = async () => {
    const response = await getAllPSCAPI();
    console.log("response", response);
    if (response?.data?.docs?.length > 0) {
      setArrPSCList(response?.data?.docs || []);
    }
  };

  const fetchCourseDetails = async () => {
    // const response = await getCourseDetails(courseId);
    // if (response?.statusCode === 200) {
    //   console.log("response", response);
    // }
  };

  const onSubmitBtnPressed = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("featured", featured);
    formData.append("priority", priority);
    if (courseImg?.data && courseImg?.name) {
      const file = base64ToFile(courseImg.data, courseImg.name);
      formData.append("image", file);
    }
    formData.append("psc_id", selectedPSC);
    const response = await toast.promise(createCourseAPI(formData), {
      loading: "Creating new course...",
      success: (res) => `${res?.data?.name} created successfully!`,
      error: (err) => `${err.message || "Something went wrong."}`,
    });
    console.log("course created response", response);
  };

  const onCancelBtnPressed = () => {
    navigate("/course");
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Course Details</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="Courses" href="#" component="a" />
            <StyledBreadcrumb label="Course Detail" component="a" />
          </Breadcrumbs>
        </div>
        <form className="form">
          <div className="row">
            <div className="col-sm-12">
              <div className="card shadow p-4">
                <h5 className="mb-4">Course Information</h5>
                <div className="form-group">
                  <h6>Course Name*</h6>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <h6>Course Description*</h6>
                  <textarea
                    rows={5}
                    cols={10}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>PSC Section*</h6>
                      <Select
                        value={selectedPSC}
                        onChange={(e) => setSelectedPSC(e.target.value)}
                        displayEmpty
                        className="w-100"
                        required
                        disabled={arrPSCList?.length === 0}
                      >
                        {arrPSCList.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item?._id}>
                              {item?.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>Status*</h6>
                      <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        displayEmpty
                        className="w-100"
                        required
                      >
                        <MenuItem value="Yes">YES</MenuItem>
                        <MenuItem value="No">NO</MenuItem>
                      </Select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>Featured*</h6>
                      <Select
                        value={featured}
                        onChange={(e) => setFeatured(e.target.value)}
                        displayEmpty
                        className="w-100"
                      >
                        <MenuItem value="Yes">YES</MenuItem>
                        <MenuItem value="No">NO</MenuItem>
                      </Select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>Course Priority</h6>
                      <input
                        type="text"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      />
                    </div>
                  </div>
                  <FileUpload
                    themeMode={themeMode ? "light" : "dark"}
                    setImg={setCourseImg}
                    label={'Course Photo'}
                  />
                  <div className="d-flex w-50 justify-content-between gap-3 mt-3">
                    <Button
                      variant="contained"
                      color="primary"
                      className="w-50 btn-lg btn-big bg-transparent border border-primary text-primary"
                      onClick={onCancelBtnPressed}
                    >
                      <span className="fw-bold text-primary">Cancel</span>
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className="w-50 ms-2 btn-lg btn-big btn-primary border border-primary text-primary"
                      onClick={onSubmitBtnPressed}
                    >
                      <span className="fw-bold text-white">Submit</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseDetails;
