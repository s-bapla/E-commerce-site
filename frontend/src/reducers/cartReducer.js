import { createSlice } from '@reduxjs/toolkit';
import cartService from '../services/cartService';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart(state, action) {
      return action.payload;
    },
    removeProduct(state, action) {
      return state.filter((item) => item.product.id.toString() !== action.payload.toString());
    },
  },
});

export default cartSlice.reducer;

export const { setCart, removeProduct } = cartSlice.actions;

export const set_cart = () => {
  return async (dispatch) => {
    try {
      const cart = await cartService.getCart();
      dispatch(setCart(cart));
    } catch (e) {
      console.log(e.message);
    }
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

export const remove_product_from_cart = (productId) => {
  return async (dispatch) => {
    try {
      await cartService.deleteProduct(productId);
      dispatch(removeProduct(productId));
    } catch (e) {
      console.log(e.message);
    }
  };
};
