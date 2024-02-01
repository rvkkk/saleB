import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";
const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getUserShippingAddresses = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}shipping-addresses`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getUserDefaultShippingAddress = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseURL}shipping-address/default`, headers)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          //onTokenBroken();
          reject(err);
        });
    });
  };

export const addShippingAddress = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}shipping-address`, payload, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const updateShippingAddress = (id, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}shipping-address/${id}`, payload, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const deleteShippingAddress = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}shipping-address/${id}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};
