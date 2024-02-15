import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";
const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}products/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getUserProducts = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}products-user`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const addProducts = (userName, file) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("file", file);
    axios
      .post(`${baseURL}products-many`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const addProduct = (
  title,
  description,
  technicalDetails,
  productSpecs,
  status,
  category,
  brand,
  price,
  discount,
  images,
  video,
  quantityLeft,
  pin
) => {
  return new Promise((resolve, reject) => {
    console.log(
      title,
      description,
      technicalDetails,
      productSpecs,
      status,
      category,
      brand,
      price,
      discount,
      images,
      video,
      quantityLeft,
      pin
    );
    axios
      .post(
        `${baseURL}products`,
        {
          title,
          description,
          technicalDetails,
          productSpecs,
          status,
          category,
          brand,
          price,
          discount,
          images,
          video,
          quantityLeft,
          pin,
        },
        headers
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const updateProduct = (
  id,
  title,
  description,
  technicalDetails,
  productSpecs,
  status,
  category,
  brand,
  price,
  discount,
  images,
  video,
  quantityLeft,
  pin
) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `${baseURL}products/${id}`,
        {
          title,
          description,
          technicalDetails,
          productSpecs,
          status,
          category,
          brand,
          price,
          discount,
          images,
          video,
          quantityLeft,
          pin,
        },
        headers
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}products/${id}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getProducts = (page = 1, limit = 30) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}products?page=${page}&limit=${limit}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getProductsByCategory = (category, page = 1, limit = 30) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${baseURL}products-category/${category}?page=${page}&limit=${limit}`
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const searchProducts = (
  category,
  filters,
  page,
  limit,
  minPrice,
  maxPrice,
  sortBy
) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}search-products`, {
        category,
        filters,
        page,
        limit,
        minPrice,
        maxPrice,
        sortBy,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};
