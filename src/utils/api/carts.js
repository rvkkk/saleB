import axios from "axios";

const baseURL = "http://localhost:3001/";

const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getCarts = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}carts`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getUserCart = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}carts-user`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
       // onTokenBroken();
        reject(err);
      });
  });
};

export const addCart = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}carts`, payload, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const updateCart = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}carts`, payload, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const deleteCart = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}carts/${id}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const deleteFromCart = (productId, size, model) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}carts-remove/${productId}`, {size, model}, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
       // onTokenBroken();
        reject(err);
      });
  });
};
