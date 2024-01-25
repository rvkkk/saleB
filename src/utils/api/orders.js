import axios from "axios";

const baseURL = "http://localhost:3001/";

const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getOrders = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}orders`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getOrder = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}orders/${id}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getUserOrders = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}orders-user`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const addOrder = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}orders`, payload, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const updateOrder = (id, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}orders/${id}`, payload, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const deleteOrder = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}orders/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

//כנראה לא צריך
export const deleteAllOrders = () => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}orders-user`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};