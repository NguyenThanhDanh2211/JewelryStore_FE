import { Grid, Box, Typography, Button, Link } from '@mui/material';

import discount from '~/assets/images/discount.jpg';

function Discount() {
  return (
    <Grid
      container
      spacing={4}
      alignItems="center"
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '40px 0',
        maxWidth: '1200px',
        margin: 'auto',
      }}
    >
      {/* Left side: Text content */}
      <Grid item xs={12} md={5}>
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="body1"
            sx={{
              color: '#db9662',
              letterSpacing: '1px',
              marginBottom: '16px',
            }}
          >
            LIMITED TIME OFFER
          </Typography>

          <Typography
            variant="h1"
            sx={{
              marginBottom: '16px',
            }}
          >
            Get 20% Off on Your First Purchase
          </Typography>

          <Typography
            variant="body2"
            sx={{
              marginBottom: '24px',
              textAlign: 'justify',
            }}
          >
            Hurry up and enjoy this limited-time deal! Apply the 20% discount on
            your first order and experience premium quality products. Don't miss
            this chance to save and upgrade your style today.
          </Typography>

          <Link href="/product">
            <Button
              variant="single"
              size="large"
              sx={{
                '&:hover': {
                  backgroundColor: '#b8764d',
                },
              }}
            >
              SHOP NOW
            </Button>
          </Link>
        </Box>
      </Grid>

      {/* Right side: Image */}
      <Grid item xs={12} md={7}>
        <Box
          component="img"
          src={discount}
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Discount;
