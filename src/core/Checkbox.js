import React, { useState, useEffect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setCheked] = useState([]);

  const handleToggle = catId =>()=>{
    const currentCatId = checked.indexOf(catId); // index of methode will return first index of given element found or return -1
    const newCheckedCategoryId = [...checked]
    if (currentCatId === -1){ // anding into the array
      newCheckedCategoryId.push(catId);
    }else{ // removing from the array
      newCheckedCategoryId.splice(currentCatId, 1);
    }
    //console.log(newCheckedCategoryId);
    setCheked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);

  }
  return categories.map((cat, index) => { 
    //console.log("abc: "+checked.indexOf(cat._id === -1))
    return (
    <li key={index} className="list-unstyled">
      <input onChange={handleToggle(cat._id)} value={checked.indexOf(cat._id === -1)} type="checkbox" className="form-check-input" />
      <label className="form-check-label">{cat.name}</label>
    </li>
  )});
};

export default Checkbox;
