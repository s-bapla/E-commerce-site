import { useSelector } from 'react-redux'; // Import hooks from redux
import Order from '../components/Order/Order';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import backgroundImage from '../image.jpg';
import { Pagination } from '@mui/material';
import { useState } from 'react';

const Orders = () => {
  const orders = useSelector((state) => state.orders); // Select orders from the Redux state
  const [page, setPage] = useState(1);
  const ordersPerPage = 4;

  // Calculate total number of pages
  const getCount = () => {
    return Math.ceil(orders.length / ordersPerPage);
  };

  // Get orders for the current page
  const getDisplayedOrders = () => {
    const startIndex = (page - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    return orders.slice(startIndex, endIndex);
  };

  // Handle page change
  const handleChange = (event, value) => {
    setPage(value);
  };
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
            getDisplayedOrders().map((order) => (
              <Order key={order.id} order={order} />
            )) // Pass each order to the Order component
          ) : (
            <p>No orders found.</p>
          )}
          <Box sx={{ marginTop: 3, marginBottom: 3 }}>
            <Pagination
              count={getCount()}
              page={page}
              onChange={handleChange}
              shape='rounded'
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Orders;
