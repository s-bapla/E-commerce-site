import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { Box, Container } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';

const ProductGrid = () => {
  const products = useSelector((state) => state.products);
  const [page, setPage] = useState(1);
  const productsPerPage = 4;

  // Calculate total number of pages
  const getCount = () => {
    return Math.ceil(products.length / productsPerPage);
  };

  // Get products for the current page
  const getDisplayedProducts = () => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

  // Handle page change
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container
      sx={{
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Grid
        container
        justifyContent='center'
        alignContent='center'
        spacing={2}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
      >
        {getDisplayedProducts().map((product) => (
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={product.id}
            xs={4} // Full width on extra-small screens
            sm={4} // Two columns on small screens
            md={4} // Three columns on medium screens
            lg={4} // Four columns on large screens
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: 3, marginBottom: 3 }}>
        <Pagination
          count={getCount()}
          page={page}
          onChange={handleChange}
          shape='rounded'
        />
      </Box>
    </Container>
  );
};

export default ProductGrid;
