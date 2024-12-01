import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import ProductCardComponent from '~/components/ProductCard';

function Related({ productId, handleAddToCartOne }) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/product/getRecommendations/${productId}`
        );

        setRelatedProducts(response.data.recommendedProducts);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (!productId || typeof productId !== 'string' || productId.trim() === '') {
    return <div>Invalid Product ID</div>;
  }

  return (
    <Grid container spacing={2}>
      {relatedProducts.length > 0
        ? relatedProducts.slice(0, 5).map((item) => (
            <Grid item xs={12} sm={6} md={2.4} key={item._id}>
              <ProductCardComponent
                product={item}
                handleAddToCart={handleAddToCartOne}
                isLoading={false}
              />
            </Grid>
          ))
        : Array.from({ length: 5 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <ProductCardComponent isLoading={true} />
            </Grid>
          ))}
    </Grid>
  );
}

export default Related;
