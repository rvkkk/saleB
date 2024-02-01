import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";
const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getMailingList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}mailing-list`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const addToMailingList = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}mailing-list`, { email }, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const deleteFromMailingList = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}mailing-list/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};
