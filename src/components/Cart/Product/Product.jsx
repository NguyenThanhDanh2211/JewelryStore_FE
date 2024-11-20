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
        xs={12}
        alignItems="center"
        className="product-row"
        data-product={productName}
      >
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
            <Typography variant="h3">{productName}</Typography>
          </Link>
        </Grid>
        <Grid item xs={1.5}>
          <Typography variant="text">$ {productPrice.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={2.5}>
          <ButtonGroup>
            <Button
              className="decrease-qty"
              onClick={() => handleUpdateQuantity(quantity - 1)}
            >
              <Typography variant="text">-</Typography>
            </Button>
            <Button>
              <Typography variant="text" className="product-quantity">
                {quantity}
              </Typography>
            </Button>
            <Button
              className="increase-qty"
              onClick={() => handleUpdateQuantity(quantity + 1)}
            >
              <Typography variant="text">+</Typography>
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={1.5} className="total-price">
          <Typography variant="text">
            ${' '}
            {(itemTotalPrice ? itemTotalPrice : 0).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Grid>
        <Grid item xs={1} className="remove-product">
          <IconButton onClick={handleRemove}>
            <HighlightOffIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12} py={1} mr={5}>
        <Divider></Divider>
      </Grid>
    </>
  );
}

export default Product;
