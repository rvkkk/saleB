import axios from "axios";

const baseURL = "http://localhost:3001/";

const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getOrdersTracking = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}orderTrackings`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getOrderTracking = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}orderTrackings/${id}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getOrderOrdersTracking = (orderId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}orderTrackings-order/${orderId}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const addOrderTracking = (orderId, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}orderTrackings-order/${orderId}`, payload, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const updateOrderTracking = (id, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}orderTrackings/${id}`, payload, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const deleteOrderTracking = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}orderTrackings/${id}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const deleteOrderOTracking = (orderId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}orderTrackings-order/${orderId}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};
