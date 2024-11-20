import { Grid, Box, styled, Typography } from '@mui/material';

const DiscountContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '8%',
  color: '#DC586D',
  border: '2px #DC586D solid',
  top: '25px',
  left: '25px',
  zIndex: 2,
  width: '70px',
  display: 'flex',
  justifyContent: 'center',
}));

function Image({ images, discount }) {
  return (
    <Grid container spacing={2} className="product-img">
      <Grid item xs={6} style={{ position: 'relative' }}>
        {images[0] && (
          <>
            <img
              src={images[0]}
              alt="Product 1"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
            {discount && (
              <DiscountContainer>
                <Typography variant="nav">{discount}% OFF</Typography>
              </DiscountContainer>
            )}
          </>
        )}
      </Grid>
      <Grid item xs={6}>
        {images[1] && (
          <img
            src={images[1]}
            alt="Product 2"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        )}
      </Grid>
      <Grid item xs={6}>
        {images[2] && (
          <img
            src={images[2]}
            alt="Product 3"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        )}
      </Grid>
      <Grid item xs={6}>
        {images[3] && (
          <img
            src={images[3]}
            alt="Product 4"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default Image;
