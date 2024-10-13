import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { Container } from '@mui/material';

const ProductGrid = () => {
  const products = useSelector((state) => state.products);

  return (
    <Container sx={{ width: '100vw' }}>
      <Grid
        container
        justifyContent='center'
        alignContent='center'
        spacing={2}
        columns={{ xs: 4, s: 8, md: 12, lg: 16 }}
      >
        {products.map((product) => (
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center', // Center horizontally
              alignItems: 'center', // Center vertically
            }}
            key={product.id}
            size={4}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductGrid;
