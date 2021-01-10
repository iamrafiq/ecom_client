
import { API } from "../../config";

export const create = (userId, token, data) => {
    return fetch(`${API}/manufacturer/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  export const update = (id, userId, token, data) => {
    return fetch(`${API}/manufacturer/${id}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data, // we are not sending json stringify because in boady we are sending form data (chosed to send from data becaue of image)
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => console.log(err));
  };
  
  export const remove = (id, userId, token) => {
    return fetch(`${API}/manufacturer/${id}/${userId}`, {
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
  
  export const getManufacturertList = () => {
    return fetch(`${API}/manufacturer/all/list`, {
      method: "GET",
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => console.log(err));
  };

  export const getManufacturerBySlug = (slug) => {
    return fetch(`${API}/manufacturer/byslug/${slug}`, {
      method: "GET",
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => console.log(err));
  };

  export const getManufacturerById = (id) => {
    return fetch(`${API}/manufacturer/byid/${id}`, {
      method: "GET",
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => console.log(err));
  };