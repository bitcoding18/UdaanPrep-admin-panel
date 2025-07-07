import { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

const AdminFormModal = ({ show, handleClose, handleSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "admin",
  });
  
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({...initialData, mobile: initialData?.phone});
    } else {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: "admin",
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
        <h5 className="mb-4">{initialData ? "Edit Admin" : "Add New Admin"}</h5>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <TextField
              label="Mobile Number"
              name="mobile"
              type="tel"
              fullWidth
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={formData.password}
              onChange={handleChange}
              required
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

          <div className="mb-4">
            <TextField
              select
              label="Role"
              name="role"
              fullWidth
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="super admin">Super Admin</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </div>

          <div className="d-flex justify-content-end">
            <Button variant="outlined" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {initialData ? "Update Admin" : "Add Admin"}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AdminFormModal;
