import {
  IconButton,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { add_order, set_orders } from '../../reducers/orderReducer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const TotalAndCheckout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * Number(item.product.price),
    0
  );
  const isCartEmpty = cart.length === 0;

  const handleCheckout = async (e) => {
    e.preventDefault();
    dispatch(add_order());
    dispatch(set_orders());
    const userJSON = window.localStorage.getItem('user');
    const user = JSON.parse(userJSON);
    const config = {
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    };

    try {
      console.log('sending post request to checkout');
      const response = await axios.post(
        'http://localhost:3000/create-checkout-session',
        '',
        config
      );
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <Card sx={{ mt: 3, width: '100%', maxWidth: 900, boxShadow: 3 }}>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Typography variant='h5'>
          Total: {formatCurrency(totalPrice)}
        </Typography>
        <Button
          variant='contained'
          color='primary'
          startIcon={<ShoppingCartCheckoutIcon />}
          disabled={isCartEmpty}
          onClick={handleCheckout}
        >
          {isCartEmpty ? 'Cart is Empty' : 'Proceed to Checkout'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TotalAndCheckout;
