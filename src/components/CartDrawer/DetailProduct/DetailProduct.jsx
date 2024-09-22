import { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  IconButton,
  Link,
  Divider,
  ButtonGroup,
  Button,
  Typography,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { updateCart } from '~/services/updateCartService';

function DetailProduct({ product, updateCartItems }) {
  const { productId, productImg, productName, productPrice } = product;
  const initialQuantity = product.quantity;

  const [quantity, setQuantity] = useState(initialQuantity);

  const handleUpdateQuantity = async (newQuantity) => {
    if (newQuantity < 0) return;

    setQuantity(newQuantity);

    const token = localStorage.getItem('authToken');

    try {
      await updateCart(productId, newQuantity, token);
      updateCartItems(productId, newQuantity);
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  return (
    <>
      <Grid
        item
        container
        spacing={2}
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        sx={{ my: 1 }}
      >
        <Grid item xs={3}>
          <Box>
            {productImg ? (
              <Link href="/">
                <img
                  src={productImg}
                  alt={productName}
                  style={{ width: '100%' }}
                />
              </Link>
            ) : (
              <p>No image available</p>
            )}
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Grid
            item
            container
            spacing={2}
            xs={12}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>{productName}</Grid>
            <Grid item>
              <IconButton>
                <HighlightOffIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={2}
            xs={12}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button
                  onClick={() => handleUpdateQuantity(quantity - 1)}
                  disabled={quantity <= 0}
                >
                  -
                </Button>
                <Button>
                  <Typography>{quantity}</Typography>
                </Button>
                <Button onClick={() => handleUpdateQuantity(quantity + 1)}>
                  +
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item>{productPrice} VND</Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
}

export default DetailProduct;
