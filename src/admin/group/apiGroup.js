
import { API } from "../../config";

export const create = (userId, token, data) => {
    return fetch(`${API}/group/create/${userId}`, {
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
    return fetch(`${API}/group/${id}/${userId}`, {
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
    return fetch(`${API}/group/${id}/${userId}`, {
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
  
  export const getGroupList = () => {
    return fetch(`${API}/group/all/list`, {
      method: "GET",
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => console.log(err));
  };

  export const getGroupBySlug = (slug) => {
    return fetch(`${API}/group/byslug/${slug}`, {
      method: "GET",
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => console.log(err));
  };

  export const getGroupById = (id) => {
    return fetch(`${API}/group/byid/${id}`, {
      method: "GET",
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => console.log(err));
  };