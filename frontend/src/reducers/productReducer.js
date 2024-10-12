import { createSlice } from "@reduxjs/toolkit";
import productServices from '../services/productService'

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
  },
});

export const {setProducts, appendProduct} = productSlice.actions

export const initialize = () => {
    return async dispatch => {
        try {
        const products = await productServices.getAll();
        dispatch(setProducts(products)); 
        } catch(e) {
            console.log(e.message);
        }
        
    }
}

export const addProduct = (product) => {
  return async (dispatch) => {
    try {
      const p = await productServices.createNew(product);
      dispatch(appendProduct(p));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export default productSlice.reducer 