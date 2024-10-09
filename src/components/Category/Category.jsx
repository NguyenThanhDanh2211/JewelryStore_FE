import { Box, Grid, styled, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByCategory } from '~/services/productService';
import ProductCardComponent from '../ProductCard';
import Collection from './CollectionList';

const CategoryContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  margin: '0 auto',
  padding: theme.spacing(3),
}));

function Category() {
  const { category, collection } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductByCategory(category, collection);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, collection]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <CategoryContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: '30px' }}>
        <Typography variant="h3">{category}</Typography>
      </Box>

      {/* Selector cho Collection */}
      <Box>
        <Collection category={category} />
      </Box>

      {/* Hiển thị các sản phẩm */}
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xxs={12} sm={6} md={3} key={product._id}>
            <ProductCardComponent product={product} />
          </Grid>
        ))}
      </Grid>
    </CategoryContainer>
  );
}

export default Category;
