import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import EditProductForm from '../components/EditProduct/EditProductForm';

const EditProduct = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ marginTop: '100px' }}>
        <EditProductForm />
      </Box>
    </>
  );
};

export default EditProduct;
