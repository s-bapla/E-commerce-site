import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { useDispatch, useSelector } from 'react-redux';
import { Container, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { ListItemAvatar, Avatar } from '@mui/material';
import { update_cart } from '../../reducers/cartReducer';

function RenderRow(props) {
  const { index, style } = props;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const increment = (e) => {
    e.preventDefault();
    console.log(cart)
    dispatch(
      update_cart({
        product: cart[index].product.id,
        quantity: cart[index].quantity + 1,
      })
    );
  };

    const decrement = (e) => {
      e.preventDefault();
      dispatch(
        update_cart({
          product: cart[index].product.id,
          quantity: cart[index].quantity - 1,
        })
      );
    };

  return (
    <ListItem style={style} key={index} component='div' disablePadding>
      <ListItemAvatar>
        <Avatar variant='square'>
          <img src={cart[index].product.imageUrl} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`Item: ${cart[index] ? cart[index].product.title : ''}`}
      />
      <IconButton onClick={decrement}>
        <RemoveIcon></RemoveIcon>
      </IconButton>
      <Box>
        <Typography>
          {`Quantity: ${cart[index] ? cart[index].quantity : ' '}`}
        </Typography>
      </Box>
      <IconButton onClick={increment}>
        <AddIcon />
      </IconButton>
    </ListItem>
  );
}

export default function CartList() {
  const cart = useSelector((state) => state.cart);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: 400,
          maxWidth: 900,
          bgcolor: 'background.paper',
        }}
      >
        <FixedSizeList
          height={400}
          width={900}
          itemSize={46}
          itemCount={cart.length}
          overscanCount={5}
        >
          {RenderRow}
        </FixedSizeList>
      </Box>
    </Container>
  );
}
