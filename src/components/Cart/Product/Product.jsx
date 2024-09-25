import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Link,
  Typography,
  IconButton,
} from '@mui/material';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { updateCart, delProductInCart } from '~/services/cartService';

function Product({ product, updateCartItems }) {
  const { productId, slug, productImg, productName, productPrice } = product;
  const initialQuantity = product.quantity;

  const [quantity, setQuantity] = useState(initialQuantity);
  const [itemTotalPrice, setItemTotalPrice] = useState(
    initialQuantity * productPrice
  );

  const handleUpdateQuantity = async (newQuantity) => {
    const token = localStorage.getItem('authToken');
    if (newQuantity < 0) return;

    setQuantity(newQuantity);
    setItemTotalPrice(newQuantity * productPrice);

    try {
      await updateCart(productId, newQuantity, token);
      updateCartItems(productId, newQuantity);
    } catch (error) {
      console.log('Failed to update cart: ', error);
    }
  };

  const handleRemove = async () => {
    const token = localStorage.getItem('authToken');

    try {
      await delProductInCart(productId, token);
      updateCartItems(productId, 0);
    } catch (error) {
      console.log('Failed to remove product:', error);
    }
  };

  useEffect(() => {
    setQuantity(product.quantity);
    setItemTotalPrice(product.quantity * productPrice);
  }, [product.quantity, productPrice]);

  return (
    <>
      {/* title */}
      <Grid
        item
        container
        spacing={2}
        xs={12}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={2}>
          <Box>
            {productImg ? (
              <Link to={`/product/${slug}`}>
                <img
                  src={productImg}
                  alt={productName}
                  style={{ width: '75%' }}
                />
              </Link>
            ) : (
              <p>No img available</p>
            )}
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Link
            component={RouterLink}
            to={`/product/${slug}`}
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography variant="h6">{productName}</Typography>
          </Link>
        </Grid>
        <Grid item xs={2}>
          {productPrice}
        </Grid>
        <Grid item xs={2}>
          <ButtonGroup>
            <Button onClick={() => handleUpdateQuantity(quantity - 1)}>
              -
            </Button>
            <Button>{quantity}</Button>
            <Button onClick={() => handleUpdateQuantity(quantity + 1)}>
              +
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={2}>
          {itemTotalPrice}
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={handleRemove}>
            <HighlightOffIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12} py={1}>
        <Divider></Divider>
      </Grid>
    </>
  );
}

export default Product;
