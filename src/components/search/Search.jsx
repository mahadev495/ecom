import React from "react";
import "./Search.css";

const Search = ({ value, onChangeData }) => {
  return (
    <div>
      <input
        className="search__input"
        type="text"
        placeholder="Search Oreka.in"
        value={value}
        onChange={onChangeData}
      />
    </div>
  );
};

export default Search;
