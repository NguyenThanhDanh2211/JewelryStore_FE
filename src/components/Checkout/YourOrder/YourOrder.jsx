import { useContext } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';

import { CartContext } from '~/contexts/CartContext';
// import { Girl } from '@mui/icons-material';

function YourOrder() {
  const { cart } = useContext(CartContext);

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

        {cart.items.length > 0 ? (
          cart.items.map((item, index) => (
            <>
              <Grid
                container
                spacing={3}
                key={index}
                alignItems="center"
                sx={{ marginTop: '0px' }}
              >
                <Grid item xs={2}>
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
                  <Typography variant="text">$ {item.productPrice}</Typography>
                </Grid>
              </Grid>
              <Divider sx={{ marginTop: '10px' }} />
            </>
          ))
        ) : (
          <Typography>No items in the cart</Typography>
        )}

        <Grid container spacing={3} sx={{ marginTop: '0px' }}>
          <Grid item xs={6}>
            <Typography variant="body3">Total</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Typography variant="body3">$ {cart.totalPrice}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default YourOrder;
