import { Button, TextField, Box } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { update_product } from '../../reducers/productReducer';
import { useState } from 'react';
import {
    useNavigate,
  // ...
  useParams,
} from 'react-router-dom';

const EditProductForm = () => {
  const id = useParams().id;
  const product = useSelector((state) =>
    state.products.find((product) => product.id === id)
  );

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [description, setDescription] = useState(product.description);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddProduct = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const price = e.target.price.value;
    const imageUrl = e.target.imageUrl.value;
    const description = e.target.description.value;

    const product = { title, price, imageUrl, description };
    dispatch(update_product(product, id));
    navigate('/')
  };
  return (
    <form style={{ textAlign: 'center' }} onSubmit={handleAddProduct}>
      <Box m={2}>
        <TextField
          label='Product Name'
          variant='outlined'
          required
          name='title'
          sx={{ width: '350px' }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box m={2}>
        <OutlinedInput
          type='number'
          id='outlined-adornment-amount'
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          name='price'
          sx={{ width: '350px' }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Box>
      <Box m={2}>
        <TextField
          label='Image Url'
          variant='outlined'
          required
          name='imageUrl'
          sx={{ width: '350px' }}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </Box>
      <Box m={2}>
        <TextField
          label='description'
          variant='outlined'
          required
          name='description'
          multiline
          rows={4}
          sx={{ width: '350px' }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>

      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default EditProductForm;
