import { IoSearch } from "react-icons/io5";
import { useRef, useState } from "react";
import { Button } from "@mui/material";

const SearchBox = (props) => {
  const { onSubmit, onChange } = props;
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit?.(searchValue);
      inputRef.current?.blur();
    }
  };

  const onReset = () => {
    onSubmit?.("");
    setSearchValue("");
    inputRef.current?.blur();
  };

  return (
    <div className="d-flex">
      <div className="searchBox position-relative d-flex align-items-center w-100">
        <IoSearch className="searchIcon me-2" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search here..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            onChange?.(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          style={{ flex: 1 }}
        />
      </div>
      <Button
        variant="contained"
        className="w-25 ms-5"
        onClick={() => onSubmit?.(searchValue)}
      >
        Search
      </Button>
      <Button
        className="w-25 ms-2"
        variant="outlined"
        disabled={searchValue.trim() === ''}
        onClick={() => onReset()}
      >
        Reset
      </Button>
    </div>
  );
};

export default SearchBox;
