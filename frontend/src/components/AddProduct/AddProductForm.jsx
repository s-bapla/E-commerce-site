import { Button, TextField, Box } from '@mui/material';
import { OutlinedInput } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../reducers/productReducer';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleAddProduct = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const price = e.target.price.value;
    const imageUrl = e.target.imageUrl.value;
    const description = e.target.description.value;

    const product = { title, price, imageUrl, description };
    dispatch(addProduct(product));
    navigate('/');
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
        />
      </Box>
      <Box m={2}>
        <OutlinedInput
          type='number'
          id='outlined-adornment-amount'
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          name='price'
          sx={{ width: '350px' }}
        />
      </Box>
      <Box m={2}>
        <TextField
          label='Image Url'
          variant='outlined'
          required
          name='imageUrl'
          sx={{ width: '350px' }}
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
        />
      </Box>

      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default AddProductForm;
