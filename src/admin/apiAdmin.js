import { API } from "../config";
import queryString from 'query-string'

// export const createCategory = (userId, token, category) => {
//   return fetch(`${API}/category/create/${userId}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(category),
//   })
//     .then((responce) => {
//       return responce.json();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: category,
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateCategory = (categoryId, userId, token, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: category, // we are not sending json stringify because in boady we are sending form data (chosed to send from data becaue of image)
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};

export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};
export const deleteHome = (homeId, userId, token) => {
  return fetch(`${API}/home/delete/${homeId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};
export const getCategoriesWithProducts = () => {
  return fetch(`${API}/categories-with-products`, {
    method: "GET",
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};
export const getTree = () => {
  return fetch(`${API}/categories/tree`, {
    method: "GET",
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};
export const getCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "GET",
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};

export const getChildren = (categoryId) => {
  return fetch(`${API}/category/children/${categoryId}`, {
    method: "GET",
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};


export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};
export const orderDetails = (userId, orderId, token) => {
  return fetch(`${API}/order/details/${userId}/${orderId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status, orderId }),
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};
/**
 * to Perform CRUD on products
 * get all the products
 * get a single products
 * update single product
 * delete single product
 */
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProducts = () => {
  return fetch(`${API}/products?limit=undefined`, {
    method: "GET",
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};

export const getAllProducts = () => {
  return fetch(`${API}/allproducts`, {
    method: "GET",
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};

export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product, // we are not sending json stringify because in boady we are sending form data (chosed to send from data becaue of image)
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};

   
export const getProductsByCatId = (id) => {
  return fetch(`${API}/products/by/category/${id}`, {
    method: "GET",
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};

