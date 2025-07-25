import React, { useContext } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import Slider from "react-slick";
import { MdBrandingWatermark } from "react-icons/md";
import UserAvatarImgComponent from "../../components/userAvatarImg";
import { Button, Rating } from "@mui/material";
import { FaReply } from "react-icons/fa";
import { arrProductInfo, arrProductRatings } from "../../constants";
import { MyContext } from "../../App";
import { StyledBreadcrumb } from "../../utils/breadcrumbUtils";

const ProductDetails = () => {
  const productSliderBig = React.useRef(null);
  const productSliderSml = React.useRef(null);
  const context = useContext(MyContext);

  var productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  var productSliderSmlOptions = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: false,
  };

  const goToSlide = (slideIndex) => {
    if (productSliderBig?.current) {
      productSliderBig.current.slickGoTo(slideIndex - 1);
    }
    if (productSliderSml?.current) {
      productSliderSml.current.slickGoTo(slideIndex - 1);
    }
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 res-col">
          <h5 className="mb-0">Product View</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="Products" href="#" component="a" />
            <StyledBreadcrumb label="Product View" component="a" />
          </Breadcrumbs>
        </div>

        <div className="card productDetailsSection">
          <div className="row">
            <div className="col-md-5">
              <div className="sliderWrapper pt-3 pb-3 ps-4 pe-4">
                <h6 className="mb-4">Product Gallery</h6>
                <Slider
                  {...productSliderOptions}
                  ref={productSliderBig}
                  className="sliderBig mb-2"
                >
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/02.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/03.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/04.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/02.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/03.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/04.webp"
                      className="w-100"
                    />
                  </div>
                </Slider>
                <Slider
                  {...productSliderSmlOptions}
                  ref={productSliderSml}
                  className="sliderSml"
                >
                  <div className="item" onClick={() => goToSlide(1)}>
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item" onClick={() => goToSlide(2)}>
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/02.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item" onClick={() => goToSlide(3)}>
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/03.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item" onClick={() => goToSlide(4)}>
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/04.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item" onClick={() => goToSlide(5)}>
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item" onClick={() => goToSlide(6)}>
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/02.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item" onClick={() => goToSlide(7)}>
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/03.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item" onClick={() => goToSlide(8)}>
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/04.webp"
                      className="w-100"
                    />
                  </div>
                </Slider>
              </div>
            </div>

            <div className="col-md-7">
              <div className="pt-3 pb-3 ps-4 pe-4">
                <h6 className="mb-4">Product Details</h6>
                <h4>
                  Formal suits for men wedding slim fit 3 piece dress business
                  party jacket
                </h4>

                <div className="productInfo mt-4">
                  <div className="row mb-10">
                    {arrProductInfo.map((item, index) => {
                      return (
                        <div className="mb-3 flex-row d-flex">
                          <div className="col-sm-3 d-flex align-items-center">
                            <span className="icon">
                              {item?.icon ? (
                                item?.icon
                              ) : (
                                <MdBrandingWatermark />
                              )}
                            </span>
                            <span className="name">{item?.key}</span>
                          </div>
                          <div className="col-sm-9">
                            :
                            <div className="ms-2">
                              {item?.type === "string" ? (
                                item?.value
                              ) : (
                                <span>
                                  <ul className="list list-inline tags sml">
                                    {item?.value?.map((subItem, subIndex) => {
                                      return (
                                        <li className="list-inline-item ms-0">
                                          <span>{subItem}</span>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h6 className="mt-4 mb-3">Product Description</h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              reprehenderit repellendus expedita esse cupiditate quos doloremque
              rerum, corrupti ab illum est nihil, voluptate ex dignissimos! Sit
              voluptatem delectus nam, molestiae, repellendus ab sint quo
              aliquam debitis amet natus doloremque laudantium? Repudiandae,
              consequuntur, officiis quidem quo deleniti, autem non laudantium
              sequi error molestiae ducimus accusamus facere velit consectetur
              vero dolore natus nihil temporibus aspernatur quia consequatur?
              Consequuntur voluptate deserunt repellat tenetur debitis molestiae
              doloribus dicta. In rem illum dolorem atque ratione voluptates
              asperiores maxime doloreque laudantium magni neque ad quae quos
              quidem, quaerat rerum ducimus blanditiis reiciendis
            </p>

            <br />

            <h6 className="mt-4 mb-3">Rating Analytics</h6>

            <div className="ratingSection">
              {arrProductRatings?.map((rating) => {
                return (
                  <div className="ratingrow d-flex align-items-center">
                    <span className="col1">{rating?.stars} Star</span>
                    <div className="col2">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{ width: rating?.percentage }}
                        ></div>
                      </div>
                    </div>
                    <span className="col3">{`(${rating?.count})`}</span>
                  </div>
                );
              })}
            </div>

            <br />

            <h6 className="mt-4 mb-3">Customer Reviews</h6>

            <div className="reviewsSection">
              <div className="reviewsRow">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="userInfo d-flex align-items-center mb-3">
                        <UserAvatarImgComponent
                          img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                          lg={true}
                        />

                        <div className="info ms-3">
                          <h5>Miron Mahmud</h5>
                          <span>25 minutes ago!</span>
                        </div>
                      </div>

                      <Rating
                        name="read-only"
                        value={4.5}
                        readOnly
                        precision={0.5}
                      />
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center ">
                    <div className="ms-auto">
                      <Button className="btn-blue btn-lg btn-big ms-auto">
                        <FaReply /> &nbsp;Reply
                      </Button>
                    </div>
                  </div>

                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae reprehenderit repellendus expedita esse cupiditate
                    quos doloremque rerum, corrupti ab illum est nihil,
                    voluptate ex dignissimos! Sit voluptatem delectus nam,
                    molestiae, repellendus ab sint quo aliquam debitis
                  </p>
                </div>
              </div>

              <div className="reviewsRow reply">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="userInfo d-flex align-items-center mb-3">
                        <UserAvatarImgComponent
                          img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                          lg={true}
                        />

                        <div className="info ms-3">
                          <h5>Miron Mahmud</h5>
                          <span>25 minutes ago!</span>
                        </div>
                      </div>

                      <Rating
                        name="read-only"
                        value={4.5}
                        readOnly
                        precision={0.5}
                      />
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center ">
                    <div className="ms-auto">
                      <Button className="btn-blue btn-lg btn-big ms-auto">
                        <FaReply /> &nbsp;Reply
                      </Button>
                    </div>
                  </div>

                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae reprehenderit repellendus expedita esse cupiditate
                    quos doloremque rerum, corrupti ab illum est nihil,
                    voluptate ex dignissimos! Sit voluptatem delectus nam,
                    molestiae, repellendus ab sint quo aliquam debitis
                  </p>
                </div>
              </div>

              <div className="reviewsRow reply">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="userInfo d-flex align-items-center mb-3">
                        <UserAvatarImgComponent
                          img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                          lg={true}
                        />

                        <div className="info ms-3">
                          <h5>Miron Mahmud</h5>
                          <span>25 minutes ago!</span>
                        </div>
                      </div>

                      <Rating
                        name="read-only"
                        value={4.5}
                        readOnly
                        precision={0.5}
                      />
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center ">
                    <div className="ms-auto">
                      <Button className="btn-blue btn-lg btn-big ms-auto">
                        <FaReply /> &nbsp;Reply
                      </Button>
                    </div>
                  </div>

                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae reprehenderit repellendus expedita esse cupiditate
                    quos doloremque rerum, corrupti ab illum est nihil,
                    voluptate ex dignissimos! Sit voluptatem delectus nam,
                    molestiae, repellendus ab sint quo aliquam debitis
                  </p>
                </div>
              </div>

              <div className="reviewsRow">
                <div className="row">
                  <div className="col-sm-7 d-flex">
                    <div className="d-flex flex-column">
                      <div className="userInfo d-flex align-items-center mb-3">
                        <UserAvatarImgComponent
                          img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
                          lg={true}
                        />

                        <div className="info ms-3">
                          <h5>Miron Mahmud</h5>
                          <span>25 minutes ago!</span>
                        </div>
                      </div>

                      <Rating
                        name="read-only"
                        value={4.5}
                        readOnly
                        precision={0.5}
                      />
                    </div>
                  </div>

                  <div className="col-md-5 d-flex align-items-center ">
                    <div className="ms-auto">
                      <Button className="btn-blue btn-lg btn-big ms-auto">
                        <FaReply /> &nbsp;Reply
                      </Button>
                    </div>
                  </div>

                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae reprehenderit repellendus expedita esse cupiditate
                    quos doloremque rerum, corrupti ab illum est nihil,
                    voluptate ex dignissimos! Sit voluptatem delectus nam,
                    molestiae, repellendus ab sint quo aliquam debitis
                  </p>
                </div>
              </div>
            </div>

            <br />

            <h6 className="mt-4 mb-3">Review Reply Form</h6>
            <form className="reviewForm">
              <textarea placeholder="Write here" />
              <Button className="btn-blue btn-big btn-lg w-100 mt-4 text-capitalize">
                drop your replies
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
