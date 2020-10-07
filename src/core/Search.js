import React from "react";
import { getCategories, list } from "./apiCore";
import { useEffect, useState } from "react";
import Card from "./Card";

const Search = (props) => {
    console.log("Props",props);
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });
  const { categories, category, search, results, searched } = data;
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };
  useEffect(() => {
    loadCategories();
  }, []);
  const searchData=()=>
  {
     // console.log(search, category);
     if (search){
         list({search:search||undefined, category:category})
         .then(responce =>{
             if (responce.error){
                 console.log(responce.error)
             }else{
                 setData({...data, results: responce, searched:true })
             }
         } )
     }
  }
  const searchSubmit = (event) => {
      event.preventDefault();
      searchData();
  };
  const handleChange = (name) => event=> {
      setData({...data, [name]:event.target.value, searched:false});
  };

  const searchMessage = (searched, results) => {
      console.log('searched', searched);
      if(searched && results.length > 0){
          return `Found ${results.length} product`
      }
      if(searched && results.length < 1){
        return `No products found`
    }
  }
  const searchProducts = (results=[]) =>{
       return(<div>
           <h2 className="mt-4 mb-4">{
               searchMessage(searched, results)
           }</h2>
           <div className="row">
           {results.map((product, index)=>(
               <Card key={index} product={product}/>
           ))}
       </div>
       </div>) 
  }
  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select
              name=""
              id=""
              className="btn mr-2"
              onChange={handleChange("category")}
            >
              <option value="All">All</option>

              {categories.map((cat, index) => (
                <option key={index} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{border:'none'}}>
                <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );
  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchProducts(results)}</div>

    </div>
  );
};

export default Search;
