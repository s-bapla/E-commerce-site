import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});

export default store;
