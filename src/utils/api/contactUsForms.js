import axios from "axios";

const baseURL = "http://localhost:3001/";
const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getEmailContactForms = (email) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}contact-forms/?email=${email}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getContactForms = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}contact-forms`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};

export const getContactForm = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseURL}contact-forms/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
       // onTokenBroken();
        reject(err);
      });
  });
};

export const addContactForm = (fullName, email, subject, message) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseURL}contact-forms`, { fullName, email, subject, message }, headers)
      .then((res) => {
        console.log(res);
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        //onTokenBroken();
        reject(err);
      });
  });
};

export const updateContactForm = (
  id,
  fullName,
  email,
  subject,
  message,
) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`${baseURL}contact-forms/${id}`, {
        fullName,
        email,
        subject,
        message,
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

export const deleteContactForm = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseURL}contact-forms/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        //onTokenBroken();
        reject(err);
      });
  });
};