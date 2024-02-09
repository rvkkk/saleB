import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";

export const getSubcategoriesOfCategory = (categoryId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}subcategories/${categoryId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getSubcategoriesOfSubcategory = (title) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}subcategory/${title}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addSubcategory = (categoryName, title, name, image) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("name", name);
    formData.append("image", image)
    axios
      .post(`${baseURL}subcategory/${categoryName}`, formData, {
        headers: {
           "Content-Type": 'multipart/form-data',
        }})
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateCategory = (title, name, image) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}subcategory/${title}`, { name, image })
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
      .delete(`${baseURL}subcategory/${title}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
