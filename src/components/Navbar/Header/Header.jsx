import { useState, useEffect } from 'react';
import { Stack, styled, Typography, Box, Divider, Grid } from '@mui/material';

const HeaderContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: theme.spacing(1),
}));

const HorizontalMenu = styled(Box)(({ theme }) => ({
  margin: '0 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

function Header() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const endDate = new Date('2024-12-31T23:59:59');
    const now = new Date();
    const difference = endDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <HeaderContainer sx={{ backgroundColor: '#222529' }}>
        <Typography variant="nav" textAlign="center" color="#fff">
          UP TO 40% OFF EVERYTHING | 30% OFF MOST LOVED - NEW LINES ADDED | FREE
          DELIVERY FOR NEXT 3 ORDERS
        </Typography>
      </HeaderContainer>

      <HeaderContainer sx={{ backgroundColor: '#f6dac2' }}>
        <Grid
          container
          spacing={2}
          sx={{
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <Grid item xs={12} md={3}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              Winter Sale
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              20% Off Everything for a limited time only
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                fontWeight: 'bold',
                color: '#333',
                fontSize: '22px',
              }}
            >
              {timeLeft.days}
              <Typography sx={{ fontSize: '0.75rem' }}>Days</Typography>

              {timeLeft.hours}
              <Typography sx={{ fontSize: '0.75rem' }}>Hours</Typography>

              {timeLeft.minutes}
              <Typography sx={{ fontSize: '0.75rem' }}>Minutes</Typography>

              {timeLeft.seconds}
              <Typography sx={{ fontSize: '0.75rem' }}>Seconds</Typography>
            </Box>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ color: '#666' }}
            >
              Time remaining until the end of the campaign
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="nav"
              sx={{
                textDecoration: 'none',
                color: '#db9662',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '1rem',
              }}
            >
              GIFT CODE: WINTER
            </Typography>
          </Grid>
        </Grid>
      </HeaderContainer>

      <HeaderContainer>
        <HorizontalMenu>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="nav"
              color="#000"
              component="a"
              href="/about"
              sx={{
                textDecoration: 'none',
                '&:hover': { color: '#db9662' },
                fontWeight: '300',
              }}
            >
              ABOUT US
            </Typography>
            <Typography
              variant="nav"
              color="#000"
              component="a"
              href="#"
              sx={{
                textDecoration: 'none',
                '&:hover': { color: '#db9662' },
                fontWeight: '300',
              }}
            >
              BLOG
            </Typography>
            <Typography
              variant="nav"
              color="#000"
              component="a"
              href="/contact"
              sx={{
                textDecoration: 'none',
                '&:hover': { color: '#db9662' },
                fontWeight: '300',
              }}
            >
              CONTACT
            </Typography>
          </Box>

          <Typography
            variant="nav"
            color="#000"
            sx={{
              textAlign: 'right',
              fontWeight: '300',
            }}
          >
            Get Support From An Expert - (84 - 1800 - 1800)
          </Typography>
        </HorizontalMenu>
      </HeaderContainer>
      <Divider />
    </>
  );
}

export default Header;
