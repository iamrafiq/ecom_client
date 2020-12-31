import { API } from "../config";
import queryString from 'query-string'

export const getHome = () => {
  return fetch(`${API}/home`, {
    method: "GET",
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};
export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method:"GET"
    })
    .then(responce => {
        return responce.json()
    })
    .catch(err => console.log(err))
}

export const getImage = () => {
  return fetch(`http://192.168.0.109:8000/api/image/home-10?p=pfs&ext=png&res=high`, {
      method:"GET"
  })
  .then(responce => {
      return responce.json()
  })
  .catch(err => console.log(err))
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method:"GET"
    })
    .then(responce => {
        return responce.json()
    })
    .catch(err => console.log(err))
}


export const getFilteredProducts = (skip, limit, filters={}) => {
    const data = {
        limit, skip, filters
    }
    return fetch(`${API}/products/by/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  export const list = params => {
    const query = queryString.stringify(params);
    console.log(query);
    return fetch(`${API}/products/search?${query}`, {
        method:"GET"
    })
    .then(responce => {
        return responce.json()
    })
    .catch(err => console.log(err))
}


export const read = (productId) => {
  return fetch(`${API}/product/${productId}`, {
      method:"GET"
  })
  .then(responce => {
      return responce.json()
  })
  .catch(err => console.log(err))
}


export const listRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method:"GET"
    })
    .then(responce => {
        return responce.json()
    })
    .catch(err => console.log(err))
}

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method:"GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
          },
    })
    .then(responce => {
        return responce.json()
    })
    .catch(err => console.log(err))
}

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
          },
          body: JSON.stringify(paymentData)
    })
    .then(responce => {
        return responce.json()
    })
    .catch(err => console.log(err))
}

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
          },
          body: JSON.stringify({order: createOrderData})
    })
    .then(responce => {
        return responce.json()
    })
    .catch(err => console.log(err))
}  


export const getAdvertisementsBySlug = (slug) => {
    return fetch(`${API}/advertisements/${slug}`, {
      method: "GET",
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => console.log(err));
  };

 


  export const getProductsByCategorySlug = (slug) => {
    return fetch(`${API}/category/products/byslug/${slug}`, {
      method: "GET",
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => console.log(err));
  };

  export const getProductsByCategoryId = (id) => {
    return fetch(`${API}/category/products/byid/${id}`, {
      method: "GET",
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => console.log(err));
  };


