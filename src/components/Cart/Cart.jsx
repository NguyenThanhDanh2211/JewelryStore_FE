import { useContext } from 'react';
import {
  Box,
  Divider,
  Grid,
  Typography,
  Button,
  Link,
  styled,
  Stack,
} from '@mui/material';
import Product from './Product';
import { CartContext } from '~/contexts/CartContext';
import { EmptyCart } from '../Icons';
import FreeShip from './FreeShip';

const CartContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  width: '100%',
  padding: '20px 70px 70px',
  display: 'flex',
  flexDirection: 'column',
}));

function Cart() {
  const { cart, updateProductInCart, fetchCart } = useContext(CartContext);

  const shippingFee = cart.totalPrice && cart.totalPrice < 1000 ? 10 : 0;

  const updateCartItems = (productId, newQuantity) => {
    if (newQuantity === 0) return null;
    if (newQuantity > 0) {
      updateProductInCart(productId, newQuantity);
    } else {
      updateProductInCart(productId, 0);
      fetchCart();
    }
  };

  return (
    <CartContainer>
      <Grid container spacing={3} item xs={12} md={12}>
        <Grid item xs={8} container>
          <Box sx={{ width: '100%', mb: 2 }}>
            <FreeShip totalPrice={cart.totalPrice || 0} />
          </Box>

          <Grid item container spacing={1} xs={12}>
            <Grid item xs={5.25}>
              <Typography variant="h3">Product</Typography>
            </Grid>
            <Grid item xs={1.5}>
              <Typography variant="h3">Price</Typography>
            </Grid>
            <Grid item xs={2.25}>
              <Typography variant="h3">Quantity</Typography>
            </Grid>
            <Grid item xs={1.5}>
              <Typography variant="h3">Subtotal</Typography>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ mt: 1, mr: 5 }} />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ minHeight: '200px' }}>
              {cart.items.length > 0 ? (
                cart.items.map((item, index) => (
                  <Product
                    key={`${item.productId}-${index}`}
                    product={item}
                    updateCartItems={updateCartItems}
                  />
                ))
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  mt={5}
                >
                  <EmptyCart width="220px" height="110px" />
                  <Typography mt={2}>No item in the cart.</Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            position: 'sticky',
            top: '10px',
            alignSelf: 'flex-start',
          }}
        >
          <Typography variant="h3" gutterBottom>
            Cart Total
          </Typography>
          <Divider sx={{ mb: 1, mr: 2 }} />

          <Grid container justifyContent="space-between" sx={{ mb: 1, pr: 2 }}>
            <Typography variant="nav" fontSize="20px">
              Subtotal
            </Typography>
            <Typography variant="nav" fontSize="20px">
              ${' '}
              {(cart.totalPrice ? cart.totalPrice : 0).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Grid>

          <Grid container justifyContent="space-between" sx={{ mb: 1, pr: 2 }}>
            <Typography variant="text">Shipping Fee</Typography>
            <Typography variant="text">
              + ${' '}
              {shippingFee.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Grid>

          <Divider sx={{ my: 2, mr: 2 }} />

          <Grid container justifyContent="space-between" sx={{ mb: 2, pr: 2 }}>
            <Typography variant="nav" fontSize="20px" color="#db9662">
              Total
            </Typography>
            <Typography variant="nav" fontSize="20px" color="#db9662">
              ${' '}
              {(
                (cart.totalPrice ? cart.totalPrice : 0) + shippingFee
              ).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Grid>
          <Divider sx={{ mb: 2, mr: 2 }} />

          <Box sx={{ mt: 2, pr: 2 }}>
            <Link href="/checkout">
              <Button variant="single" type="submit" fullWidth>
                Checkout
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </CartContainer>
  );
}

export default Cart;
