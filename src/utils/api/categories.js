import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}categories`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getCategory = (title) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}category/${title}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addCategory = ({ title, name }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}category`, { title, name })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateCategory = ({ title, name }) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}category/${title}`, { name })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteCategory = (title) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}category/${title}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
