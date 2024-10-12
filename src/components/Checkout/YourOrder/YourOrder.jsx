import { useContext, useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Grid,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { CartContext } from '~/contexts/CartContext';
import { getAllDiscount } from '~/services/discountService';

function YourOrder({ setCouponDetail, setTotalPrice }) {
  const { cart } = useContext(CartContext);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [discounts, setDiscounts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [copiedCart, setCopiedCart] = useState(cart);

  useEffect(() => {
    if (cart.items.length > 0) {
      setCopiedCart(cart);

      const finalPrice =
        (parseFloat(cart.totalPrice) - parseFloat(discount)) * 1000;

      setTotalPrice(Number(finalPrice));
    }
  }, [cart, discount, setTotalPrice]);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const discountList = await getAllDiscount();
        setDiscounts(discountList);
      } catch (error) {
        console.log('Error fetching discount', error);
      }
    };

    fetchDiscount();
  }, []);

  const handleCouponClick = () => {
    setShowCouponInput(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleCouponApply();
    }
  };

  const handleCouponApply = () => {
    if (couponCode) {
      const foundDiscount = discounts.find(
        (discount) => discount.code === couponCode
      );

      if (foundDiscount) {
        setIsCouponApplied(true);
        const discountAmount = foundDiscount.percent * 0.01 * cart.totalPrice;
        setDiscount(discountAmount);
        setErrorMessage('');

        setCouponDetail(couponCode);
      } else {
        setErrorMessage('Invalid coupon code');
        clearErrorMessage();
      }
    } else {
      setErrorMessage('Please enter a valid coupon code');
      clearErrorMessage();
    }
  };

  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Your order
      </Typography>
      <Box
        sx={{
          border: '1px solid ',
          borderRadius: '8px',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="nav">Product</Typography>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="nav">Subtotal</Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: '10px' }} />

        {copiedCart.items.length > 0 ? (
          copiedCart.items.map((item, index) => (
            <div key={index}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={2} sx={{ marginTop: '15px' }}>
                  <img
                    src={item.productImg[0]}
                    alt={item.productName}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                    }}
                  />
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="text">
                    {item.productName} x {item.quantity}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Typography variant="text">
                    $ {item.itemTotalPrice.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ marginTop: '10px' }} />
            </div>
          ))
        ) : (
          <Typography>No items in the cart.</Typography>
        )}

        <Grid container spacing={3}>
          <Grid item xs={6} my={1}>
            <Typography variant="body3">Subtotal</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            my={1}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="body3">
              $ {(copiedCart.totalPrice - 0).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        <Divider />

        {/* Display coupon code and discount after applying */}
        {isCouponApplied && (
          <>
            <Grid container spacing={3}>
              <Grid item xs={6} my={1}>
                <Typography variant="text1">
                  Coupon Code: {couponCode}
                </Typography>
              </Grid>
              <Grid
                item
                my={1}
                xs={6}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Typography variant="text1">
                  - ${discount.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </>
        )}

        <Grid container spacing={3}>
          <Grid item xs={6} my={1}>
            <Typography variant="body3" color="#db9662">
              Total
            </Typography>
          </Grid>
          <Grid
            item
            mt={1}
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="body3" color="#db9662">
              $ {(copiedCart.totalPrice - discount).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>

        {errorMessage && (
          <Box>
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        )}

        {!isCouponApplied && !showCouponInput ? (
          <>
            <Divider />
            <Typography
              variant="text1"
              onClick={handleCouponClick}
              display="flex"
              mt={1}
              sx={{ cursor: 'pointer', color: 'primary.main' }}
            >
              Have a coupon?
            </Typography>
          </>
        ) : (
          !isCouponApplied && (
            <Grid container spacing={1} sx={{ my: 1 }}>
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
                  onKeyDown={handleKeyDown}
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
          )
        )}
      </Box>
    </>
  );
}

export default YourOrder;
