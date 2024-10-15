import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import PropTypes from 'prop-types';
import { Button, CardContent, CardMedia, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { add_cart } from '../../reducers/cartReducer';

const ProductCard = ({ product }) => {
const dispatch = useDispatch();
  const handleCart = (e) => {
    e.preventDefault();
    dispatch(add_cart({product: product.id, quantity: 1}))
  }
  return (
    <Card elevation={5} sx={{ width: 330 }}>
      <CardHeader title={product.title} />
      <CardMedia component='img' height='194' image={product.imageUrl} />
      <CardContent>
        <Typography variant='h6' sx={{ color: 'text.secondary' }}>
          ${product.price}
        </Typography>
      </CardContent>{' '}
      <CardContent>
        <Typography variant='body2' sx={{ color: 'text.secondary', margin: 1 }}>
          {product.description}
        </Typography>
        <IconButton onClick={handleCart}>
          <ShoppingCartIcon sx={{ color: '#1976d2' }} />
        </IconButton>
        <Button>Save</Button>
      </CardContent>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
