import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/cart';

const getCart = async () => {
  const userJSON = window.localStorage.getItem('user');
  const user = JSON.parse(userJSON);
  console.log(user);
  const config = {
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  };
  const res = await axios.get(baseUrl, config);
  return res.data;
};

const postCart = async (data) => {
  const userJSON = window.localStorage.getItem('user');
  const user = JSON.parse(userJSON);
  const config = {
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  };
  const res = await axios.post(baseUrl, data, config);
  return res.data;
};

const putCart = async (product) => {
  const userJSON = window.localStorage.getItem('user');
  const user = JSON.parse(userJSON);
  const config = {
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  };
  const res = await axios.put(baseUrl, product, config);
  return res.data;
};

const deleteProduct = async (productId) => {
  const userJSON = window.localStorage.getItem('user');
  const user = JSON.parse(userJSON);
  const config = {
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  };
  const res = await axios.delete(`${baseUrl}/${productId}`, config);
  return res.data;
};

export default { getCart, postCart, putCart, deleteProduct };
