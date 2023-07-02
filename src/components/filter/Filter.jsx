import React, { useState } from "react";

const Filter = ({ onChangeSort }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortChange = (e) => {
    const selectedSortOrder = e.target.value;
    setSortOrder(selectedSortOrder);
    onChangeSort(selectedSortOrder);
  };

  return (
    <div className="filter" style={{marginBottom:'10px'}}>
      <label htmlFor="sort">Sort By:</label>
      <select id="sort" value={sortOrder} onChange={handleSortChange}>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: Hight to Low</option>
      </select>
    </div>
  );
};

export default Filter;
