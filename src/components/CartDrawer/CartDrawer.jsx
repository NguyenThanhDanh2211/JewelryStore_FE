import { useState, useEffect, useCallback, useContext } from 'react';
import {
  Box,
  Divider,
  Drawer,
  Typography,
  Button,
  Link,
  Grid,
} from '@mui/material';
import { getAllCart } from '~/services/cartService';
import DetailProduct from './ListProduct';

function CartDrawer({ open, toggleDrawer }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = useCallback(async (token) => {
    try {
      const response = await getAllCart(token);
      if (response) {
        setCartItems(response.items);
        setTotalPrice(response.totalPrice);
      } else {
        console.warn('Cart not found in the response.');
        setCartItems([]);
        setTotalPrice(0);
      }
    } catch (error) {
      console.log('Failed to fetch cart details:', error);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchCart(token);
    }
  }, [fetchCart, open]);

  const updateCartItems = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.reduce((acc, item) => {
        if (item.productId === productId) {
          if (newQuantity > 0) {
            acc.push({ ...item, quantity: newQuantity });
          }
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, []);

      return updatedItems;
    });
  };

  useEffect(() => {
    updateTotalPrice(cartItems);
  }, [cartItems]);

  const updateTotalPrice = (items) => {
    if (!items) return;
    const newTotalPrice = items.reduce((total, item) => {
      return total + item.quantity * item.productPrice;
    }, 0);
    setTotalPrice(newTotalPrice); // Cập nhật tổng giá trị mới
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
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <DetailProduct
                key={`${item.productId}-${index}`}
                product={item}
                updateCartItems={updateCartItems}
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
                {totalPrice} VND
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
