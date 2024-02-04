import axios from "axios";

const baseURL = "http://localhost:3001/";

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

/*const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const imageData = event.target.result;
    axios
      .post(`${baseURL}category`, {title, name,  image: imageData, number}, {
        headers: {
          'Content-Type': image.type,
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })*/

export const addCategory = (title, name, image) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("name", name);
    formData.append("image", image)
    axios
      .post(`${baseURL}category`, formData, {
        headers: {
           "Content-Type": 'multipart/form-data',
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })
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
