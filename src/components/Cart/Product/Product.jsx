import { useEffect, useState, useContext } from 'react';
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
import { CartContext } from '~/contexts/CartContext';

function Product({ product, updateCartItems }) {
  const { productId, slug, productImg, productName, productPrice } = product;
  const initialQuantity = product.quantity;

  const [quantity, setQuantity] = useState(initialQuantity);
  const [itemTotalPrice, setItemTotalPrice] = useState(
    initialQuantity * productPrice
  );

  const { updateProductInCart, deleteProductFromCart } =
    useContext(CartContext);

  const handleUpdateQuantity = async (newQuantity) => {
    // const token = localStorage.getItem('authToken');
    if (newQuantity < 0) return;

    setQuantity(newQuantity);
    updateProductInCart(productId, newQuantity);
    updateCartItems(productId, newQuantity);
  };

  const handleRemove = async () => {
    deleteProductFromCart(productId);
    updateCartItems(productId, 0);
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
        // justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={2}>
          <Box>
            {productImg ? (
              <Link to={`/product/${slug}`} component={RouterLink}>
                <img
                  src={productImg[0]}
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
            <Typography variant="h2">{productName}</Typography>
          </Link>
        </Grid>
        <Grid item xs={2}>
          $ {productPrice}
        </Grid>
        <Grid item xs={2}>
          <ButtonGroup>
            <Button onClick={() => handleUpdateQuantity(quantity - 1)}>
              <Typography variant="body2">-</Typography>
            </Button>
            <Button>
              <Typography variant="body2">{quantity}</Typography>
            </Button>
            <Button onClick={() => handleUpdateQuantity(quantity + 1)}>
              <Typography variant="body2">+</Typography>
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={2}>
          $ {itemTotalPrice}
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
