import { createSlice } from '@reduxjs/toolkit';
import productServices from '../services/productService';

const productSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    setProducts(state, action) {
      return action.payload;
    },
    appendProduct(state, action) {
      state.push(action.payload);
    },
    updateProduct(state, action) {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      state[index] = action.payload.product;
    },
    deleteProduct(state, action) {
      return state.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setProducts, appendProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export const initialize = () => {
  return async (dispatch) => {
    try {
      const products = await productServices.getAll();
      dispatch(setProducts(products));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const addProduct = (product) => {
  return async (dispatch) => {
    try {
      const p = await productServices.createNew(product);
      dispatch(appendProduct(p));
    } catch (e) {
      console.log(e);
    }
  };
};

export const update_product = (content, id) => {
  return async (dispatch) => {
    try {
      const product = await productServices.update(content, id);
      dispatch(updateProduct({ product: product, id: id }));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const delete_product = (id) => {
  return async (dispatch) => {
    try {
        await productServices.deleteProduct(id);
       dispatch(deleteProduct(id)); 
    } catch (e) {
      console.log(e.message);
    }
    
  };
};

export default productSlice.reducer;
