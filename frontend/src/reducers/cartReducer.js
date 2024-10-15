import { createSlice } from '@reduxjs/toolkit';
import cartService from '../services/cartService';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart(state, action) {
      return action.payload;
    },
  },
});

export default cartSlice.reducer;

export const { setCart, appendProduct, updateProduct } = cartSlice.actions;

export const set_cart = () => {
  return async (dispatch) => {
    const cart = await cartService.getCart();
    dispatch(setCart(cart));
  };
};

export const add_cart = (data) => {
  return async (dispatch) => {
    const cart = await cartService.postCart(data);
    dispatch(setCart(cart));
  };
};

export const update_cart = (data) => {
  return async (dispatch) => {
    const cart = await cartService.putCart(data);
    dispatch(setCart(cart));
  };
};
