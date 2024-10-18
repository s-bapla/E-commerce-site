import { useSelector } from 'react-redux'; // Import hooks from redux
import Order from '../components/Order/Order';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import backgroundImage from '../../public/image.jpg';

const Orders = () => {
  const orders = useSelector((state) => state.orders); // Select orders from the Redux state

  return (
    <>
      <NavBar />
      <Box
        sx={{
          paddingTop: '100px',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'repeat',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            marginTop: '100px',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            padding: '20px',
            borderRadius: '8px',
            width: 'fit-content',
            margin: '0 auto',
          }}
        >
          {orders.length > 0 ? (
            orders.map((order) => <Order key={order.id} order={order} />) // Pass each order to the Order component
          ) : (
            <p>No orders found.</p>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Orders;
