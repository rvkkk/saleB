import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";

export const searchArticles = (search) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}articles-search?q=${search}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getArticles = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}articles`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getArticle = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}articles/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addArticle = ({ title, description, content, icon }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}articles`, { title, description, content, icon })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateArticle = ({ id, title, description, content, icon }) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}articles/${id}`, { title, description, content, icon })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteArticle = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}articles/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
