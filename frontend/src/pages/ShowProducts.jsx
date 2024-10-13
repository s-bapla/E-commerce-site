import ProductGrid from '../components/productGrid/ProductGrid';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar';

const ShowProducts = () => {
  return (
    <>
      <NavBar />
      <Box sx={{ marginTop: '100px' }}>
        <ProductGrid />
      </Box>
    </>
  );
};

export default ShowProducts;
