import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { StyledBreadcrumb } from "../../utils/breadcrumbUtils";
import { GlobalContext } from "../../context/globalProvider";
import { Button, MenuItem, Select } from "@mui/material";
import FileUpload from "../../components/FileUpload";
import toast from "react-hot-toast";
import { createPSCAPI } from "../../services/api-services/psc-service";
import { base64ToFile } from "../../utils/commonFunctions";
import { useNavigate, useParams } from "react-router-dom";

const PSCDetails = () => {
  const context = useContext(GlobalContext);
  const { themeMode } = context;
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [featured, setFeatured] = React.useState("");
  const [pscImg, setPSCImage] = React.useState(null);
  const params = useParams();
  const pscId = params?.id || null;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPSCDetails();
  }, []);

  const fetchPSCDetails = async () => {
    const response = await getPSCDetails(pscId);
    if (response?.statusCode === 200) {
      console.log("response", response);
    }
  };

  const onSubmitBtnPressed = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("featured", featured);
    formData.append("priority", priority);
    if (pscImg?.data && pscImg?.name) {
      const file = base64ToFile(pscImg.data, pscImg.name);
      formData.append("image", file);
    }
    const response = await toast.promise(createPSCAPI(formData), {
      loading: "Creating new psc...",
      success: (res) => `${res?.data?.name} created successfully!`,
      error: (err) => `${err.message || "Something went wrong."}`,
    });
    navigate("/psc");
  };

  const onCancelBtnPressed = () => {
    navigate("/psc");
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">PSC Details</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="PSC" href="#" component="a" />
            <StyledBreadcrumb label="PSC Detail" component="a" />
          </Breadcrumbs>
        </div>
        <form className="form">
          <div className="row">
            <div className="col-sm-12">
              <div className="card shadow p-4">
                <h5 className="mb-4">PSC Information</h5>
                <div className="form-group">
                  <h6>PSC Name*</h6>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <h6>PSC Description*</h6>
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
                      <h6>PSC Priority</h6>
                      <input
                        type="text"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      />
                    </div>
                  </div>
                  <FileUpload
                    themeMode={themeMode ? "light" : "dark"}
                    setImg={setPSCImage}
                    label={"PSC Photo"}
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

export default PSCDetails;
