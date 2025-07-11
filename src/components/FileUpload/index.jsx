import { useEffect, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Avatar } from "@mui/material";

const FileUpload = ({ themeMode = "light", setImg, label }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (image) {
      setImg(image);
    }
  }, [image]);

  const theme = createTheme({
    palette: {
      mode: themeMode, // 'light' or 'dark'
      primary: {
        main: "#007bff",
      },
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ data: reader.result, name: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="containerd-flex ">
        <div
          className="text-white rounded form form-group"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h6>{label}</h6>
          <div className="d-flex flex-row">
            <Avatar src={image?.data} sx={{ width: 64, height: 64 }} />
            <div className="ms-3 d-flex flex-column justify-content-left">
              <label className="btn btn-secondary">
                Choose file
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              <span
                className={`ms-2 mt-2 ${
                  themeMode === "light" ? "text-black" : "text-white"
                }`}
              >
                {image ? `${image.name}` : "No file chosen"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default FileUpload;
