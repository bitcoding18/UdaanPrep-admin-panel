import { IoSearch } from "react-icons/io5";

const SearchBox = () => {
  return (
    <div className="searchBox position-relative d-flex align-items-center ms-2">
      <IoSearch className="searchIcon me-2" />
      <input type="text" placeholder="Search here..." />
    </div>
  );
};

export default SearchBox;
