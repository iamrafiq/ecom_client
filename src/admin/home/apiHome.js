import { API } from "../../config";


export const getHome = () => {
    return fetch(`${API}/home`, {
      method: "GET",
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => console.log(err));
  };

  export const createOrUpdateHome = (id, userId, token, home) => {
    if (id !== null) {
      return fetch(`${API}/home/${id}/${userId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: home, // we are not sending json stringify because in boady we are sending form data (chosed to send from data becaue of image)
      })
        .then((responce) => {
          return responce.json();
        })
        .catch((err) => console.log(err));
    } else {
      return fetch(`${API}/home/create/${userId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: home,
      })
        .then((responce) => {
          return responce.json();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };