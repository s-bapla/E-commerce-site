import AddProductForm from '../components/AddProduct/AddProductForm';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';


const AddProduct = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ marginTop: '100px' }}>
        <AddProductForm />
      </Box>
    </>
  );
};

export default AddProduct;
