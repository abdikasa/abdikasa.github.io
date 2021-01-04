import React from "react";

const Search = ({ cname = "", id = "", value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type="text"
      placeholder="Type here..."
      id={id}
      className={cname}
      autoComplete="off"
    />
  );
};

export default Search;
