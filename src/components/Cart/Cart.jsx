import { useContext, useState } from 'react';
import {
  Box,
  Divider,
  Grid,
  Typography,
  Button,
  TextField,
  Link,
} from '@mui/material';
import Product from './Product';
import { CartContext } from '~/contexts/CartContext'; // Import the CartContext

function Cart() {
  const { cart, updateProductInCart, fetchCart } = useContext(CartContext);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  // Handle when coupon input is clicked
  const handleCouponClick = () => {
    setShowCouponInput(true);
  };

  // Handle when coupon is applied
  const handleCouponApply = () => {
    console.log('Coupon Applied:', couponCode);
    // Apply coupon logic here if needed
  };

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
    <div>
      <Grid container spacing={2} item xs={12} p={5}>
        <Grid item xs={8} container pr={5}>
          <Grid item container spacing={2} xs={12} sx={{ fontWeight: 'bold' }}>
            <Grid item xs={5}>
              <Typography variant="nav">Product</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="nav">Price</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="nav">Quantity</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="nav">Subtotal</Typography>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>

          <Grid item xs={12} py={1}>
            <Divider />
          </Grid>

          {cart.items.length > 0 ? (
            cart.items.map((item, index) => (
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
            top: '10px',
            alignSelf: 'flex-start',
          }}
        >
          <Typography variant="h3" gutterBottom>
            Cart Total
          </Typography>
          <Divider sx={{ mb: 2, mr: 2 }} />

          <Grid container justifyContent="space-between" sx={{ mb: 1, pr: 2 }}>
            <Typography variant="body3">Subtotal</Typography>
            <Typography variant="body3">$ {cart.totalPrice}</Typography>
          </Grid>

          <Divider sx={{ my: 2, mr: 2 }} />

          <Grid container justifyContent="space-between" sx={{ mb: 2, pr: 2 }}>
            <Typography variant="body3">Total</Typography>
            <Typography variant="body3">$ {cart.totalPrice}</Typography>
          </Grid>
          <Divider sx={{ mb: 2, mr: 2 }} />

          {!showCouponInput ? (
            <Typography
              variant="text1"
              onClick={handleCouponClick}
              sx={{ cursor: 'pointer', color: 'primary.main', mb: 2, pr: 2 }}
            >
              Have a coupon?
            </Typography>
          ) : (
            <Grid container spacing={1} sx={{ mb: 2, pr: 2 }}>
              <Grid item xs={8}>
                <TextField
                  sx={{
                    '& .MuiInputBase-root': {
                      minHeight: '40px',
                    },
                  }}
                  fullWidth
                  size="small"
                  label="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="single"
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
            <Link href="/checkout">
              <Button variant="single" type="submit" fullWidth>
                Checkout
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Cart;
