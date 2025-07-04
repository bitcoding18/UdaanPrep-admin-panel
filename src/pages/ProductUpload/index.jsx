import React from "react";
import {
  Breadcrumbs,
  Button,
  Rating,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { FaCloudUploadAlt, FaRegImage } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { StyledBreadcrumb } from "../../utils/breadcrumbUtils";

const ProductUpload = () => {
  const [categoryVal, setCategoryVal] = React.useState("");
  const [subCategory, setSubCategory] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [isFeatured, setIsFeatured] = React.useState("");
  const [productRAM, setProductRAM] = React.useState([]);
  const [ratingValue, setRatingValue] = React.useState(4); // Default shown in UI
  const [images, setImages] = React.useState([]);
  const fileInputRef = React.useRef(null);

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4">
        <h5 className="mb-0">Product Upload</h5>
        <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs">
          <StyledBreadcrumb
            component="a"
            href="#"
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb label="Products" href="#" component="a" />
          <StyledBreadcrumb label="Product Upload" component="a" />
        </Breadcrumbs>
      </div>

      <form className="form">
        <div className="row">
          <div className="col-sm-12">
            <div className="card p-4">
              <h5 className="mb-4">Basic Information</h5>

              <div className="form-group">
                <h6>PRODUCT NAME</h6>
                <input type="text" />
              </div>

              <div className="form-group">
                <h6>DESCRIPTION</h6>
                <textarea rows={5} cols={10} />
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>CATEGORY</h6>
                    <Select
                      value={categoryVal}
                      onChange={(e) => setCategoryVal(e.target.value)}
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Men">Men</MenuItem>
                      <MenuItem value="Women">Women</MenuItem>
                      <MenuItem value="Kids">Kids</MenuItem>
                    </Select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>SUB CATEGORY</h6>
                    <Select
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Jeans">Jeans</MenuItem>
                      <MenuItem value="Shirt">Shirt</MenuItem>
                    </Select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>PRICE</h6>
                    <input type="text" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>OLD PRICE</h6>
                    <input type="text" />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>IS FEATURED</h6>
                    <Select
                      value={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.value)}
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="true">True</MenuItem>
                      <MenuItem value="false">False</MenuItem>
                    </Select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>PRODUCT STOCK</h6>
                    <input type="text" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>BRAND</h6>
                    <Select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Ten">Ten</MenuItem>
                      <MenuItem value="Twenty">Twenty</MenuItem>
                      <MenuItem value="Thirty">Thirty</MenuItem>
                    </Select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>DISCOUNT</h6>
                    <input type="text" />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>PRODUCT RAMS</h6>
                    <Select
                      multiple
                      value={productRAM}
                      onChange={(e) => setProductRAM(e.target.value)}
                      renderValue={(selected) => selected.join(", ")}
                      className="w-100"
                    >
                      {["4GB", "8GB", "10GB", "12GB", "15GB"].map((ram) => (
                        <MenuItem key={ram} value={ram}>
                          <Checkbox checked={productRAM.indexOf(ram) > -1} />
                          <ListItemText primary={ram} />
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="form-group mt-3">
                <h6>RATINGS</h6>
                <Rating
                  name="simple-controlled"
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                />
              </div>
            </div>

            <div className="card p-4">
              <div className="form-group">
                <h5 className="mb-4">Media And Published</h5>

                <div className="media-upload-container">
                  {images.map((img, index) => (
                    <div className="media-image-wrapper" key={index}>
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`upload-${index}`}
                        className="media-upload-preview"
                      />
                      <Button
                        onClick={() => {
                          const newImages = [...images];
                          newImages.splice(index, 1);
                          setImages(newImages);
                        }}
                        size="small"
                        className="media-remove-btn"
                      >
                        <IoClose size={"20px"} />
                      </Button>
                    </div>
                  ))}

                  {/* Image Upload Box */}
                  <Button
                    className="media-upload-box text-capitalize"
                    onClick={() =>
                      fileInputRef.current && fileInputRef.current.click()
                    }
                  >
                    <span className="media-upload-box-content">
                      <FaRegImage size={"30px"} className="mb-1" />
                      Image Upload
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      ref={fileInputRef}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setImages([...images, file]);
                        }
                      }}
                    />
                  </Button>
                </div>
              </div>

              <Button className="btn-blue btn-lg btn-big">
                <FaCloudUploadAlt /> &nbsp; PUBLISH AND VIEW
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductUpload;
