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
  const { productId, slug, productImg, productName, productPrice, category } =
    product;
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
      <Grid item container xs={12} alignItems="center">
        <Grid item xs={1.75}>
          <Box>
            {productImg ? (
              <Link
                to={`/shop/${category.toLowerCase()}/${slug}`}
                component={RouterLink}
              >
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
        <Grid item xs={3.5}>
          <Link
            component={RouterLink}
            to={`/shop/${category.toLowerCase()}/${slug}`}
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography variant="h2">{productName}</Typography>
          </Link>
        </Grid>
        <Grid item xs={1.5}>
          $ {productPrice.toFixed(2)}
        </Grid>
        <Grid item xs={2.5}>
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
        <Grid item xs={1.5}>
          $ {itemTotalPrice.toFixed(2)}
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
