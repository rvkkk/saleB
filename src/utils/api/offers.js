import axios from "axios";

const baseURL = "http://localhost:3001/";
const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getOffers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}offers`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getOffer = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}offers/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
       // onTokenBroken();
        reject(err);
      });
  });
};

export const getUserOffers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}offers-user`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getProductOffers = (productId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}offers-product/${productId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
       // onTokenBroken();
        reject(err);
      });
  });
};

export const addOffer = ( productId, price ) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}offers/${productId}`, { price }, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const updateOffer = ( id, price ) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}offers/${id}`, { price }, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const deleteOffer = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}offers/${id}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};
