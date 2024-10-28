import { createSlice } from '@reduxjs/toolkit';
import orderService from '../services/orderService';

const orderSlice = createSlice({
  name: 'order',
  initialState: [],
  reducers: {
    setOrders(state, action) {
      return action.payload;
    },
    appendOrder(state, action) {
      state.push(action.payload);
    },
  },
});

export default orderSlice.reducer;

export const { setOrders, appendOrder } = orderSlice.actions;

export const set_orders = () => {
  return async (dispatch) => {
    try {
      const orders = await orderService.getOrders(); // [{products: [], user: id}, ...]
      dispatch(setOrders(orders));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const add_order = () => {
  return async (dispatch) => {
    try {
      const order = await orderService.postOrder();
      dispatch(appendOrder(order));
    } catch (e) {
      console.log(e.message);
    }
  };
};
