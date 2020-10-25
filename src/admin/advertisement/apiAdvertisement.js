
import { API } from "../../config";

export const createAdvertisement = (userId, token, advertisement) => {
    return fetch(`${API}/advertisement/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: advertisement,
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  export const updateAdvertisement = (advertisementId, userId, token, advertisement) => {
    return fetch(`${API}/advertisement/${advertisementId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: advertisement, // we are not sending json stringify because in boady we are sending form data (chosed to send from data becaue of image)
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => console.log(err));
  };
  
  export const deleteAdvertisement = (advertisementId, userId, token) => {
    return fetch(`${API}/advertisement/${advertisementId}/${userId}`, {
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
  
  export const getAdvertisements = () => {
    return fetch(`${API}/advertisements`, {
      method: "GET",
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => console.log(err));
  };

  export const getAdvertisementsBySlug = (slug) => {
    return fetch(`${API}/advertisements/${slug}`, {
      method: "GET",
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => console.log(err));
  };