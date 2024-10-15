import axios from 'axios';
import productService from './productService';
const baseUrl = 'http://localhost:3000/api/cart';

const getCart = async () => {
  const config = {
    headers: {
      Authorization: productService.token,
    },
  };
  const res = await axios.get(baseUrl, config);
  return res.data;
};

const postCart = async (data) => {
  const config = {
    headers: {
      Authorization: productService.token,
    },
  };
  const res = await axios.post(baseUrl, data, config);
  return res.data;
};

const putCart = async (product) => {
  const config = {
    headers: {
      Authorization: productService.token,
    },
  };
  const res = await axios.post(baseUrl, product, config);
  return res.data;
};
 
export default {getCart, postCart, putCart}