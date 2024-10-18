import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// The Order component will accept 'order' as a prop
const Order = ({ order }) => {
  // Calculate total price for the order
  const calculateTotalPrice = (products) => {
    return products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <Box
      sx={{
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginBottom: '20px',
      }}
    >
      <Typography variant='h6' component='div'>
        Order ID: {order.id}
      </Typography>
      <Typography variant='body1' component='div' sx={{ marginBottom: '10px' }}>
        Payment Status: {order.paymentStatus}
      </Typography>
      <Typography variant='body1' component='div' sx={{ marginBottom: '10px' }}>
        Fulfillment Status: {order.isFulfilled ? 'Fulfilled' : 'Pending'}
      </Typography>

      <List>
        {order.products.map((item) => (
          <ListItem key={item.product._id}>
            <ListItemText
              primary={`${item.product.title} (x${item.quantity})`}
              secondary={`Price: $${item.product.price}`}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography variant='h6' component='div' sx={{ marginTop: '10px' }}>
        Total Price: ${calculateTotalPrice(order.products)}
      </Typography>
    </Box>
  );
};

export default Order;
