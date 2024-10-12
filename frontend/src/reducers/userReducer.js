import { createSlice } from '@reduxjs/toolkit';
import signUpService from '../services/signUpService';
import productService from '../services/productService';
import loginService from '../services/loginService';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set_user(state, action) {
      return action.payload;
    },
  },
});

export const { set_user } = userSlice.actions;

export const setUser = (data) => {
  return async (dispatch) => {
    try {
      const user = await signUpService.signUp(data);
      window.localStorage.setItem('user', JSON.stringify(user));
      productService.setToken(user.token);
      dispatch(set_user(user));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(data);
      window.localStorage.setItem('user', JSON.stringify(user));
      productService.setToken(user.token);
      dispatch(set_user(user));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export default userSlice.reducer;
