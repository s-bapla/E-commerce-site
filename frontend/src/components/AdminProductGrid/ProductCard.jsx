import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import { CardContent, CardMedia, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { delete_product } from '../../reducers/productReducer';
import { remove_product_from_cart } from '../../reducers/cartReducer';

const ProductCard = ({ product }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setAnchorEl(null);
    navigate(`/edit/${product.id}`);
  }
  const dispatch = useDispatch();
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(delete_product(product.id))
    dispatch(remove_product_from_cart(product.id))
  }
  return (
    <Card elevation={5} sx={{ width: 330 }}>
      <CardHeader
        action={
          <div>
            <IconButton
              aria-label='settings'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={(e) => {
                  handleEdit(e);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  handleDelete(e);
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </div>
        }
        title={product.title}
      />
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
