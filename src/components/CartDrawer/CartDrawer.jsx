import { useContext } from 'react';
import {
  Box,
  Divider,
  Drawer,
  Typography,
  Button,
  Link,
  Grid,
} from '@mui/material';
import { CartContext } from '~/contexts/CartContext';
import ListProduct from './ListProduct';

function CartDrawer({ open, toggleDrawer }) {
  const { cart, updateProductInCart, fetchCart } = useContext(CartContext);

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
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box
        p={2}
        width="500px"
        display="flex"
        flexDirection="column"
        height="100vh"
      >
        <Box sx={{ flexShrink: 0 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Shopping Cart
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            my: 1,
          }}
        >
          {cart.items.length > 0 ? (
            cart.items.map((item, index) => (
              <ListProduct
                key={`${item.productId}-${index}`}
                product={item}
                updateCartItems={updateCartItems} // Pass the update function to ListProduct
              />
            ))
          ) : (
            <Typography variant="nav">No items in the cart.</Typography>
          )}
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <Divider />
          <Grid
            item
            container
            spacing={2}
            xs={12}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography variant="nav" sx={{ my: 2 }}>
                Subtotal:
              </Typography>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end">
              <Typography variant="nav" sx={{ my: 2 }}>
                $ {cart.totalPrice}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Link href="/cart">
            <Button variant="single" fullWidth sx={{ my: 2 }}>
              VIEW CART
            </Button>
          </Link>
          <Link href="">
            <Button variant="single" fullWidth sx={{ mb: 1 }}>
              CHECKOUT
            </Button>
          </Link>
        </Box>
      </Box>
    </Drawer>
  );
}

export default CartDrawer;
