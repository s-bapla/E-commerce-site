import CartList from '../components/cart/CartList';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import backgroundImage from '../../public/image.jpg'; // Make sure to replace with the correct path to your image

const Cart = () => {
    return (
      <>
        <NavBar />
        <Box
          sx={{
            paddingTop: '100px', // Adjust this value to control space between NavBar and content
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'repeat', // Makes the image cover the entire box
            backgroundPosition: 'center', // Centers the image
            minHeight: '100vh', // Ensures the background covers the whole viewport height
          }}
        >
          <CartList />
        </Box>
      </>
    );
}

export default Cart;