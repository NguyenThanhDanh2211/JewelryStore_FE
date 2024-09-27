import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Button,
  ButtonGroup,
  Grid,
  Stack,
  // TextField,
  Typography,
} from '@mui/material';

import { getProductBySlug } from '~/services/productService';
import { styled } from '@mui/material/styles';
import Image from './Image';

const ProductDetailContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(8),
  gap: theme.spacing(2),
  margin: 'auto',
}));

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
    <ProductDetailContainer direction="column" justifyContent="space-between">
      {product ? (
        <Grid container item xs={12} spacing={10}>
          <Grid item xs={6}>
            <Image images={product.image} name={product.name} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h1">{product.name}</Typography>
            <Typography variant="body1" sx={{ my: '15px' }}>
              $ {product.price}
            </Typography>
            <Typography
              variant="text"
              sx={{ textAlign: 'justify', my: '15px' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
              sed numquam et fugit optio aperiam ut, voluptas error culpa aut
              quidem unde, ducimus consequuntur tempora itaque a, nostrum
              excepturi eligendi. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Pariatur sed numquam et fugit optio aperiam ut,
              voluptas error culpa aut quidem unde, ducimus consequuntur tempora
              itaque a, nostrum excepturi eligendi.
            </Typography>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'row',
                my: '15px',
              }}
            >
              <Grid item xs={3}>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                  <Button>
                    <Typography variant="body2">-</Typography>
                  </Button>
                  <Button>
                    <Typography variant="body2">1</Typography>
                  </Button>
                  <Button>
                    <Typography variant="body2">+</Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={4}>
                <Button variant="single" fullWidth>
                  ADD TO CART
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <p>Loading product details...</p> // Fallback UI while data is being fetched
      )}
    </ProductDetailContainer>
  );
}

export default ProductDetail;
