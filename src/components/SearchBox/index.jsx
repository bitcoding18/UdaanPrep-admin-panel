import { IoSearch } from "react-icons/io5";
import { useRef, useState } from "react";

const SearchBox = (props) => {
  const { onSubmit } = props;
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit?.(searchValue);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="searchBox position-relative d-flex align-items-center">
      <IoSearch className="searchIcon me-2" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search here..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ flex: 1 }}
      />
    </div>
  );
};

export default SearchBox;
