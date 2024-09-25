import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Grid } from '@mui/material';

import { getProductBySlug } from '~/services/productService';

function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductBySlug(slug);
        setProduct(response);
      } catch (error) {
        console.log('Error fetch Product', error);
      }
    };

    fetchProduct();
  }, [slug]);

  return (
    <>
      {product ? (
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <img src={product.image} alt={product.name} width="50%" />
          </Grid>
          <Grid item xs={6}>
            <h1>{product.name}</h1>
            <p>Price: {product.price} VND</p>
          </Grid>
        </Grid>
      ) : (
        <p>Loading product details...</p> // Fallback UI while data is being fetched
      )}
    </>
  );
}

export default ProductDetail;
