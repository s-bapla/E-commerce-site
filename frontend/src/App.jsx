import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

    useEffect(() => {
      const userJSON = window.localStorage.getItem('user');
      if (userJSON) {
        const user = JSON.parse(userJSON);
        productService.setToken(user.token);
        dispatch(set_user(user));
      }
    }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path='/edit/:id' element={<EditProduct />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<ShowAdminProducts />} />
        <Route path='/' element={<ShowProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
