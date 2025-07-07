import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdBrandingWatermark } from "react-icons/md";

const products = [
  {
    id: 1,
    name: "Tops and skirt set for Female",
    category: "womans",
    brand: "richman",
    price: 19.0,
    originalPrice: 21.0,
    quantity: 30,
    rating: 4.9,
    reviews: 16,
    sold: 380,
    revenue: "$38k",
    image: "https://mironcoder-hotash.netlify.app/images/product/01.webp",
  },
  {
    id: 2,
    name: "Leather belt steve madden men's",
    category: "mans",
    brand: "lubana",
    price: 14.0,
    originalPrice: null,
    quantity: 23,
    rating: 4.5,
    reviews: 38,
    sold: 189,
    revenue: "$9k",
    image: "https://mironcoder-hotash.netlify.app/images/product/02.webp",
  },
  {
    id: 3,
    name: "Existing product name 3",
    category: "womans",
    brand: "ecstasy",
    price: 33.0,
    originalPrice: 44.0,
    quantity: 30,
    rating: 4.1,
    reviews: 69,
    sold: 380,
    revenue: "$38k",
    image: "https://mironcoder-hotash.netlify.app/images/product/03.webp",
  },
  {
    id: 4,
    name: "Existing product name 4",
    category: "kidz",
    brand: "ecstasy",
    price: 33.0,
    originalPrice: null,
    quantity: 30,
    rating: 4.4,
    reviews: 47,
    sold: 380,
    revenue: "$38k",
    image: "https://mironcoder-hotash.netlify.app/images/product/04.webp",
  },
  {
    id: 5,
    name: "Existing product name 5",
    category: "accessory",
    brand: "ecstasy",
    price: 33.0,
    originalPrice: null,
    quantity: 30,
    rating: 5.0,
    reviews: 47,
    sold: 380,
    revenue: "$38k",
    image: "https://mironcoder-hotash.netlify.app/images/product/05.webp",
  },
  {
    id: 6,
    name: "Existing product name 6",
    category: "womans",
    brand: "ecstasy",
    price: 33.0,
    originalPrice: null,
    quantity: 30,
    rating: 3.7,
    reviews: 47,
    sold: 380,
    revenue: "$38k",
    image: "https://mironcoder-hotash.netlify.app/images/product/06.webp",
  },
  {
    id: 7,
    name: "Existing product name 7",
    category: "womans",
    brand: "ecstasy",
    price: 33.0,
    originalPrice: 44.0,
    quantity: 30,
    rating: 4.5,
    reviews: 47,
    sold: 380,
    revenue: "$38k",
    image: "https://mironcoder-hotash.netlify.app/images/product/07.webp",
  },
  {
    id: 8,
    name: "Existing product name 8",
    category: "womans",
    brand: "ecstasy",
    price: 33.0,
    originalPrice: null,
    quantity: 30,
    rating: 4.3,
    reviews: 47,
    sold: 380,
    revenue: "$38k",
    image: "https://mironcoder-hotash.netlify.app/images/product/08.webp",
  },
  {
    id: 9,
    name: "Existing product name 9",
    category: "womans",
    brand: "ecstasy",
    price: 33.0,
    originalPrice: 44.0,
    quantity: 30,
    rating: 4.8,
    reviews: 47,
    sold: 380,
    revenue: "$38k",
    image: "https://mironcoder-hotash.netlify.app/images/product/09.webp",
  },
  {
    id: 10,
    name: "Existing product name 10",
    category: "womans",
    brand: "ecstasy",
    price: 33.0,
    originalPrice: null,
    quantity: 30,
    rating: 3.9,
    reviews: 47,
    sold: 380,
    revenue: "$38k",
    image: "https://mironcoder-hotash.netlify.app/images/product/10.webp",
  },
];

const notifications = [
  {
    name: "Mahmudul",
    message: "added to his favorite list Leather belt steve madden",
    image: "https://mironcoder-hotash.netlify.app/images/avatar/01.webp",
    time: "about few minutes ago!",
  },
  {
    name: "labonno",
    message: "leave her comment to Dressni Breathable female Dress",
    image: "https://mironcoder-hotash.netlify.app/images/avatar/02.webp",
    time: "about few minutes ago!",
  },
  {
    name: "tahmina",
    message: "announce to 50% discount New Exclusive long kurti",
    image: "https://mironcoder-hotash.netlify.app/images/avatar/03.webp",
    time: "about few minutes ago!",
  },
  {
    name: "jubayer",
    message: "write to his latest blog Best fashion outfit this winter",
    image: "https://mironcoder-hotash.netlify.app/images/avatar/04.webp",
    time: "about few minutes ago!",
  },
  {
    name: "rebeka",
    message: "give a review to Exclusive Designed Multicolor long Kaptan",
    image: "https://mironcoder-hotash.netlify.app/images/avatar/01.webp",
    time: "about few minutes ago!",
  },
  {
    name: "hotash",
    message: "privacy updated and secure all this multitask platform",
    image: "https://mironcoder-hotash.netlify.app/images/avatar/02.webp",
    time: "about few minutes ago!",
  },
];

const arrProductInfo = [
  {
    key: "Brand",
    value: "Ecstasy",
    type: "string",
    icon: <MdBrandingWatermark />,
  },
  {
    key: "Category",
    value: "Man's",
    type: "string",
    icon: <BiSolidCategoryAlt />,
  },
  {
    key: "Tags",
    value: ["SUITE", "PARTY", "DRESS", "SMART", "MAN", "STYLES"],
    type: "array",
    icon: <MdBrandingWatermark />,
  },
  {
    key: "Color",
    value: ["RED", "BLUE", "GREEN", "YELLOW", "PURPLE"],
    type: "array",
    icon: <MdBrandingWatermark />,
  },
  {
    key: "Size",
    value: ["SM", "MD", "LG", "XL", "XXL"],
    type: "array",
    icon: <MdBrandingWatermark />,
  },
  {
    key: "Price",
    value: ["$37.00", "$42.00"],
    type: "array",
    icon: <MdBrandingWatermark />,
  },
  {
    key: "Stock",
    value: "(68) Piece",
    type: "string",
    icon: <MdBrandingWatermark />,
  },
  {
    key: "Review",
    value: "(03) Review",
    type: "string",
    icon: <MdBrandingWatermark />,
  },
  {
    key: "Published",
    value: "02 Feb 2020",
    type: "string",
    icon: <MdBrandingWatermark />,
  },
];

const arrProductRatings = [
  { id: 1, percentage: "80%", count: 22, stars: 5 },
  { id: 2, percentage: "60%", count: 15, stars: 4 },
  { id: 3, percentage: "40%", count: 10, stars: 3 },
  { id: 4, percentage: "20%", count: 5, stars: 2 },
  { id: 5, percentage: "10%", count: 2, stars: 1 },
];

const BASE_URL = "https://udaanprep.onrender.com/cms";

const ApiEndPoints = {
  LOGIN_API: "/auth/login",
  REGISTER_ADMIN_API: "/auth/register-admin",
  REGISTER_STUDENT_API: "/user/add-student",
  GET_STUDENTS_LIST_API: "/user/get-all-students",
  UPDATE_STUDENT_API: "user/student",
  DELETE_STUDENT_API: "user/student",
};

const adminUsers = [
  {
    id: 1,
    name: "PRADEEP MISHRA",
    email: "pm01664@gmail.com",
    phone: "9667747204",
    registrationDate: "03-09-2022 02:19 AM",
    status: false,
    role: "super admin"
  },
  {
    id: 2,
    name: "RAMESH SUTHAR",
    email: "sutharrkt@gmail.com",
    phone: "9462272175",
    registrationDate: "02-06-2022 11:31 PM",
    status: false,
    role: "admin"
  },
  {
    id: 3,
    name: "lata kanwar",
    email: "ghaneraogourav@gmail.com",
    phone: "8003118123",
    registrationDate: "30-05-2022 11:11 PM",
    status: true,
    role: "admin"
  },
  {
    id: 4,
    name: "Kulratna solanki",
    email: "Kulratnasolanki89@gmail.com",
    phone: "9983408979",
    registrationDate: "17-04-2022 11:10 PM",
    status: false,
    role: "super admin"
  },
  {
    id: 5,
    name: "khushbu rajput",
    email: "rajputkhushbu.rajput@gmail.com",
    phone: "8905674886",
    registrationDate: "07-03-2022 04:50 PM",
    status: true,
    role: "admin"
  },
  {
    id: 6,
    name: "Ramniwas saini",
    email: "ramniwassolanki6@gmail.com",
    phone: "9784446987",
    registrationDate: "26-12-2021 01:35 PM",
    status: true,
    role: "admin"
  },
  {
    id: 7,
    name: "ads",
    email: "csa@ggd.com",
    phone: "1211121212",
    registrationDate: "26-12-2021 02:32 AM",
    status: false,
    role: "admin"
  },
  {
    id: 8,
    name: "as",
    email: "saasa@ggd.com",
    phone: "9624597111",
    registrationDate: "26-12-2021 02:19 AM",
    status: false,
    role: "admin"
  },
  {
    id: 9,
    name: "Rajat",
    email: "rajat@ggd.com",
    phone: "9912424524",
    registrationDate: "12-12-2021 06:32 PM",
    status: false,
    role: "admin"
  },
];

const DATE_FORMAT = "DD/MM/YYYY";

export {
  products,
  notifications,
  arrProductInfo,
  arrProductRatings,
  BASE_URL,
  ApiEndPoints,
  adminUsers,
  DATE_FORMAT
};
