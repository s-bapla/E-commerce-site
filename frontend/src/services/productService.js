import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/products';
let token = null;

const setToken = (tokenString) => {
  token = `Bearer ${tokenString}`;
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, content, config);
  return response.data;
};

const update = async (content, productId) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(baseUrl + '/' + productId, content, config);
  return response.data;
}; 

const deleteProduct = async id => {
  const config = { headers: { Authorization: token } };
  await axios.delete(baseUrl + '/' + id, config);
}
export default { getAll, createNew, setToken, update, deleteProduct };
