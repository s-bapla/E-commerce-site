import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import PropTypes from 'prop-types';
import { Button, CardContent, CardMedia, Typography } from '@mui/material';


const ProductCard = ({ product }) => {
  return (
    <Card sx={{ width: 330 }}>
      <CardHeader title={product.title} />
      <CardMedia component='img' height='194' image={product.imageUrl} />
      <CardContent>
        <Typography variant='h6' sx={{ color: 'text.secondary' }}>
          ${product.price}
        </Typography>
      </CardContent>{' '}
      <CardContent>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {product.description}
        </Typography>
        <Button>Add to Cart</Button>
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
