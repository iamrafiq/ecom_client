import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import { prices } from "./FixedPrices";
import RadioBox from "./RadioBox";

const Shop = (props) => {
  console.log("Props", props);
  const [shopFilters, setShopFilters] = useState({
    filters: {
      category: [],
      price: [],
    },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };
  const loadFilteredResults = (newFilters) => {
    //console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // console.log("rs", data);
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, shopFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // console.log("rs", data);
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () =>
    size > 0 &&
    size >= limit && (
      <button onClick={loadMore} className="btn btn-warning mb-5">
        Load More
      </button>
    );
  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, shopFilters.filters);
    //console.log(shopFilters.filters)
  }, []);
  const handleFilters = (filters, filterBy) => {
    //console.log("filters", filters, filterBy);
    const newFilters = { ...shopFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy == "price") {
      let priceValue = handlePrice(filters);
      newFilters.filters[filterBy] = priceValue;
    }

    loadFilteredResults(shopFilters.filters);
    setShopFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const catFilter = (filters) => {
    return handleFilters(filters, "category");
  };
  const priceFilter = (filters) => {
    return handleFilters(filters, "price");
  };

  return (
    <Layout
      title="Shop page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by category</h4>
          <ul>
            <Checkbox categories={categories} handleFilters={catFilter} />
          </ul>
          <h4>Filter by price range</h4>
          <div>
            <RadioBox prices={prices} handleFilters={priceFilter} />
          </div>
        </div>
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, index) => (
              <div key={index} className="col-4 mb-3">
                <Card product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};
export default Shop;
