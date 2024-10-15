import CartList from '../components/cart/CartList';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';

const Cart = () => {
    return (
      <>
        <NavBar />
        <Box sx={{ marginTop: '100px' }}>
          <CartList />
        </Box>
      </>
    );
}

export default Cart;