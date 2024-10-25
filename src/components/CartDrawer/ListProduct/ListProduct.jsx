import { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Box,
  IconButton,
  Divider,
  ButtonGroup,
  Button,
  Link,
  Typography,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { CartContext } from '~/contexts/CartContext';

function ListProduct({ product, updateCartItems }) {
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
      <Grid
        item
        container
        xs={12}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={3}>
          <Box sx={{ m: 1 }}>
            {productImg ? (
              <Link href={`/shop/${category.toLowerCase()}/${slug}`}>
                <img
                  src={productImg[0]}
                  alt={productName}
                  style={{ width: '90%' }}
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
            <Grid item>
              <Link
                href={`/shop/${category.toLowerCase()}/${slug}`}
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography variant="h2">{productName}</Typography>
              </Link>
            </Grid>
            <Grid item>
              <IconButton onClick={handleRemove}>
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
            <Grid item>
              <Typography variant="body2">
                ${' '}
                {(itemTotalPrice ? itemTotalPrice : 0).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
}

export default ListProduct;
