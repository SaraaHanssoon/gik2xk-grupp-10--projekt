import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from "@mui/material";
import { getAll } from '../services/ProductService';
import ProductItemSmall from './ProductItemSmall';

function ProductList({ pathname }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll(pathname).then((products) => {
      setProducts(products);
    });
  }, [pathname]);

  return (
    <Box sx={{ flexGrow: 1, padding: '2rem', backgroundColor: '#efebe9' }}>
      <Grid container spacing={{ xs: 2, sm: 3, md: 3, lg: 4 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`product_${product.id}`}>
              <ProductItemSmall product={product} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              Could not retrieve products.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

ProductList.propTypes = {
  pathname: PropTypes.string.isRequired
};

export default ProductList;
