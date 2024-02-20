import axios from "axios";

const baseURL = "https://sale-bid.df.r.appspot.com/";

const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getUserWishList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}wish-lists-user`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const checkIfInWishList = (productId) => {
  getUserWishList()
    .then((res) => {
      if (res.wishList.products.length >= 1) {
        const index = res.wishList.products.findIndex(
          (p) => p.product.id === productId
        );
        return index !== -1;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const deleteWishList = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}wish-lists/${id}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const deleteFromWishList = (productId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}wish-lists-remove/${productId}`, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const addNewWish = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}wish-lists`, payload, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const updateWishList = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}wish-lists/`, payload, headers)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};
