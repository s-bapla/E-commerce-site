import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { Container } from '@mui/material';

const ProductGrid = () => {
  const products = useSelector((state) => state.products);

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} columns={{ xs: 4, md: 12, lg: 16 }}>
        {products.map((product) => (
          <Grid key={product.id} size={4}>
            <ProductCard product={product} />
          </Grid>
        ))}

        <Grid size={4}></Grid>
      </Grid>
    </Container>
  );
};

export default ProductGrid;
