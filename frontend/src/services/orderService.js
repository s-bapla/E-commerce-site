import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/orders';

const getOrders = async () => {
  const userJSON = window.localStorage.getItem('user');
  const user = JSON.parse(userJSON);
  const config = {
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  };
  const res = await axios.get(baseUrl, config);
  return res.data;
};

const postOrder = async () => {
  const userJSON = window.localStorage.getItem('user');
  const user = JSON.parse(userJSON);
  const config = {
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  };
  const res = await axios.post(baseUrl,'', config);
  return res.data;
};

export default { getOrders, postOrder };
