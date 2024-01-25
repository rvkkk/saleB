import axios from "axios";

const baseURL = "http://localhost:3001/";
const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getAuctionProduct = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}auction-products/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getUserAProducts = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}auction-products-user`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const addAuctionProduct = (
  title,
  description,
  technicalDetails,
  productSpecs,
  status,
  category,
  brand,
  openingPrice,
  closingPrice,
  minPrice,
  maxPrice,
  startTime,
  timeFrame,
  pictures,
  video,
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${baseURL}auction-products`,
        {
          title,
          description,
          technicalDetails,
          productSpecs,
          status,
          category,
          brand,
          openingPrice,
          closingPrice,
          minPrice,
          maxPrice,
          startTime,
          timeFrame,
          pictures,
          video,
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

export const updateAuctionProduct = (
  id,
  title,
  description,
  technicalDetails,
  productSpecs,
  status,
  category,
  brand,
  openingPrice,
  minPrice,
  maxPrice,
  startTime,
  timeFrame,
  images,
  video,
  pin,
) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        `${baseURL}auction-products/${id}`,
        {
          title,
          description,
          technicalDetails,
          productSpecs,
          status,
          category,
          brand,
          openingPrice,
          minPrice,
          maxPrice,
          startTime,
          timeFrame,
          images,
          video,
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

export const deleteAuctionProduct = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}auction-products/${id}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getAuctionProducts = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}auction-products`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getAProductsByCategory = (category) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}auction-products-category/${category}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};
