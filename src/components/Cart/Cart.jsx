import { useCallback, useEffect, useState } from 'react';

import {
  Box,
  Divider,
  Grid,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import Product from './Product';
import { getAllCart } from '~/services/getAllCartService';

function Cart() {
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = useCallback(
    async (token) => {
      try {
        const response = await getAllCart(token);
        if (response) {
          setCartItems(response.items);
          setTotalPrice(response.totalPrice);
          // onCartUpdate(response.totalQuantity);
        } else {
          console.warn('Cart not found in the response.');
          setCartItems([]);
          setTotalPrice(0);
          // onCartUpdate(0);
        }
      } catch (error) {
        console.log('Failed to fetch cart details: ', error);
      }
    },
    // [onCartUpdate]
    []
  );

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchCart(token);
    }
  }, [fetchCart]);

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

  const handleCouponClick = () => {
    setShowCouponInput(true);
  };

  const handleCouponApply = () => {
    // Apply coupon logic here
    console.log('Coupon Applied:', couponCode);
  };

  return (
    <div>
      <Grid container spacing={2} item xs={12} p={5}>
        <Grid item xs={8} container pr={5}>
          <Grid item container spacing={2} xs={12} sx={{ fontWeight: 'bold' }}>
            <Grid item xs={5}>
              Product
            </Grid>
            <Grid item xs={2}>
              Price
            </Grid>
            <Grid item xs={2}>
              Quantity
            </Grid>
            <Grid item xs={2}>
              Subtotal
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>

          <Grid item xs={12} py={1}>
            <Divider />
          </Grid>

          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <Product
                key={`${item.productId}-${index}`}
                product={item}
                updateCartItems={updateCartItems}
              />
            ))
          ) : (
            <Typography p={5}>No item in the cart.</Typography>
          )}
        </Grid>

        <Grid
          item
          xs={4}
          pl={5}
          sx={{
            position: 'sticky',
            top: '10px', // Adjust as per your header height
            alignSelf: 'flex-start', // Ensures sticky works with dynamic height
          }}
        >
          <Typography variant="h3" gutterBottom>
            Cart Total
          </Typography>
          <Divider sx={{ mb: 2, mr: 2 }} />

          <Grid container justifyContent="space-between" sx={{ mb: 1, pr: 2 }}>
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1">{totalPrice} VND</Typography>
          </Grid>

          <Divider sx={{ my: 2, mr: 2 }} />

          <Grid container justifyContent="space-between" sx={{ mb: 2, pr: 2 }}>
            <Typography variant="body1">Total</Typography>
            <Typography variant="body1">{totalPrice} VND</Typography>
          </Grid>
          <Divider sx={{ mb: 2, mr: 2 }} />

          {!showCouponInput ? (
            <Typography
              onClick={handleCouponClick}
              sx={{ cursor: 'pointer', color: 'primary.main', mb: 2, pr: 2 }}
            >
              Have a coupon?
            </Typography>
          ) : (
            <Grid container spacing={1} sx={{ mb: 2, pr: 2 }}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  label="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  fullWidth
                  size="small"
                  onClick={handleCouponApply}
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
          )}

          <Box sx={{ mt: 2, pr: 2 }}>
            <Button variant="contained" type="submit" fullWidth>
              Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Cart;
