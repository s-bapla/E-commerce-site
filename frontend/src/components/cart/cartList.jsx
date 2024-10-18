import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { update_cart } from '../../reducers/cartReducer';
import TotalAndCheckout, { formatCurrency } from './TotalAndCheckout';

function RenderRow({ index, style }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const item = cart[index];

  const increment = () => {
    dispatch(
      update_cart({
        product: item.product.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const decrement = () => {
    dispatch(
      update_cart({
        product: item.product.id,
        quantity: item.quantity - 1,
      })
    );
  };

  return (
    <Card sx={{ display: 'flex', mb: 2, boxShadow: 3 }} style={style}>
      <CardMedia
        component='img'
        image={item.product.imageUrl}
        alt={item.product.title}
        sx={{ width: 120, height: 120, objectFit: 'cover' }}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h6'>{item.product.title}</Typography>
        <Typography variant='body2' color='text.secondary'>
          {`Price: ${formatCurrency(item.product.price)}`}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <IconButton onClick={decrement}>
            <RemoveIcon />
          </IconButton>
          <TextField
            value={item.quantity}
            inputProps={{ readOnly: true }}
            variant='outlined'
            size='small'
            sx={{ width: 50, textAlign: 'center', mx: 1 }}
          />
          <IconButton onClick={increment}>
            <AddIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function CartList() {
  const cart = useSelector((state) => state.cart);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
        p: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 900,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 2,
          p: 2,
          height: '400px',
          overflowY: 'scroll',
        }}
      >
        {cart.map((_, index) => (
          <RenderRow
            key={index}
            index={index}
            style={{ marginBottom: '10px' }}
          />
        ))}
      </Box>
      <TotalAndCheckout />
    </Box>
  );
}
