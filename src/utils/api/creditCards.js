import axios from "axios";

const baseURL = "http://localhost:3001/";
const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

/*const onTokenBroken = () => {
  localStorage.removeItem("token");
  //window.location.href = "/auth/login";
};*/

export const getUserCCs = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}credit-cards`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getUserDefaultCC = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}credit-cards/default`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const addCC = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}credit-cards`, payload, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const updateCC = (id, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}credit-cards/${id}`, payload, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const deleteCC = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}credit-cards/${id}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};
