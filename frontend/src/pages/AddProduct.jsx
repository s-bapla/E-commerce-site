import AddProductForm from '../components/AddProduct/AddProductForm';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import backgroundImage from '../image.jpg';

const AddProduct = () => {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          paddingTop: '100px',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'repeat',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            marginTop: '100px',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            padding: '20px',
            borderRadius: '8px',
            width: 'fit-content',
            margin: '0 auto',
          }}
        >
          <AddProductForm />
        </Box>
      </Box>
    </>
  );
};

export default AddProduct;
