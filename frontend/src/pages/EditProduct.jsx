import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';
import EditProductForm from '../components/EditProduct/EditProductForm';
import backgroundImage from '../../public/image.jpg'; // Make sure to replace with the correct path to your image

const EditProduct = () => {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          paddingTop: '100px', // Adjust this value to control space between NavBar and content
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'repeat', // Makes the image cover the entire box
          backgroundPosition: 'center', // Centers the image
          minHeight: '100vh', // Ensures the background covers the whole viewport height
        }}
      >
        <Box
          sx={{
            marginTop: '100px',
            backgroundColor: 'rgba(255, 255, 255, 1)', // Slightly transparent white background to mask the image behind inputs
            padding: '20px',
            borderRadius: '8px',
            width: 'fit-content',
            margin: '0 auto', // Centers the content horizontally
          }}
        >
          <EditProductForm />
        </Box>
      </Box>
    </>
  );
};

export default EditProduct;
