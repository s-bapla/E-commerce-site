import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { initialize } from './reducers/productReducer';
import AddProduct from './pages/AddProduct';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowAdminProducts from './pages/ShowAdminProducts';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import productService from './services/productService';
import { set_user } from './reducers/userReducer';
import EditProduct from './pages/EditProduct';
import ShowProducts from './pages/ShowProducts';
import { Navigate } from 'react-router-dom';
import { set_cart } from './reducers/cartReducer';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import { set_orders } from './reducers/orderReducer';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      productService.setToken(user.token);
      dispatch(set_user(user));
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  useEffect(() => {
    dispatch(set_orders());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(set_cart());
    }
  }, [user, dispatch]);

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route
          path='/edit/:id'
          element={
            user && user.role === 'admin' ? (
              <EditProduct />
            ) : (
              <Navigate replace to='/' />
            )
          }
        />
        <Route
          path='/add-product'
          element={
            user && user.role === 'admin' ? (
              <AddProduct />
            ) : (
              <Navigate replace to='/' />
            )
          }
        />
        <Route
          path='/cart'
          element={user ? <Cart /> : <Navigate replace to='/' />}
        />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/admin'
          element={
            user && user.role === 'admin' ? (
              <ShowAdminProducts />
            ) : (
              <Navigate replace to='/' />
            )
          }
        />
        <Route
          path='/orders'
          element={user ? <Orders /> : <Navigate replace to='/' />}
        />
        <Route path='/' element={<ShowProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
