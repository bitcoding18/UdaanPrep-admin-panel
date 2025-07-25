import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomSwitch from "../../../components/CustomSwitch";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../../constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  width: "90%",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const StudentFormModal = ({
  show,
  handleClose,
  handleSubmit,
  initialData = null,
  isFrom = "add",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    birthdate: dayjs().subtract(18, "year"),
    status: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const isEditable = isFrom !== "show";

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        birthdate: "",
        status: true,
      });
    }
  }, [initialData, show]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <Box sx={style}>
        <h5 className="mb-4">
          {initialData ? "Edit Student" : "Add New Student"}
        </h5>
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="mb-3">
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
              disabled={!isEditable}
            />
          </div>

          <div className="mb-3">
            <TextField
              label="Email"
              name="email"
              autoComplete="new-email"
              type="email"
              fullWidth
              value={formData?.email || ""}
              onChange={handleChange}
              required
              disabled={!isEditable}
            />
          </div>

          <div className="mb-3">
            <TextField
              label="Mobile Number"
              name="phone"
              type="mobile"
              autoComplete="new-password"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={!isEditable}
              slotProps={{
                htmlInput: {
                  maxLength: 10,
                },
              }}
            />
          </div>

          {initialData === null && (
            <div className="mb-3">
              <TextField
                label="Password"
                name="password"
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={formData.password}
                onChange={handleChange}
                required
                disabled={!isEditable}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          )}

          <div className="mb-3 d-flex">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Birthdate"
                  format={DATE_FORMAT}
                  defaultValue={
                    formData?.birthdate
                      ? dayjs(formData.birthdate)
                      : dayjs().subtract(18, "year")
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, birthdate: e?.format() })
                  }
                  disabled={!isEditable}
                />
              </DemoContainer>
            </LocalizationProvider>
            <div className="m-auto">
              Status
              <CustomSwitch
                checked={formData?.status}
                onChange={(e, value) =>
                  setFormData({ ...formData, status: value })
                }
              />
            </div>
          </div>

          <div className="d-flex justify-content-end mt-5">
            <Button variant="outlined" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {initialData ? "Update Student" : "Add Student"}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default StudentFormModal;
