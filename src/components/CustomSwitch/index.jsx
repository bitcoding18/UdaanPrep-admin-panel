import { styled, Switch } from "@mui/material";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  // Default track (OFF) — red
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    backgroundColor: theme.palette.error.main,
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 300,
    }),
  },
  // When switch is ON — green
  "& .Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#2AAA8A",
    opacity: 1,
  },
  // Constant thumb color (e.g., white)
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
    backgroundColor: "#fff", // Fixed color
  },
}));

export default CustomSwitch;
