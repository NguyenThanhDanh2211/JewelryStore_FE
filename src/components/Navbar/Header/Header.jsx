import { useState, useEffect } from 'react';
import { Stack, styled, Typography, Box, Divider } from '@mui/material';

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

  // Function to calculate the remaining time
  function calculateTimeLeft() {
    const endDate = new Date('2024-12-31T23:59:59'); // Set your end date here
    const now = new Date();
    const difference = endDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0 };
  }

  // Update the countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer); // Cleanup the timer on component unmount
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
        <Typography variant="nav" textAlign="center" color="#000">
          20% Off Everything With a Min. Spend, Sale Ends In: {timeLeft.days}{' '}
          DAYS {timeLeft.hours} HRS {timeLeft.minutes} MIN
        </Typography>
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
              sx={{ textDecoration: 'none', '&:hover': { color: '#db9662' } }}
            >
              ABOUT US
            </Typography>
            <Typography
              variant="nav"
              color="#000"
              component="a"
              href="/blog"
              sx={{ textDecoration: 'none', '&:hover': { color: '#db9662' } }}
            >
              BLOG
            </Typography>
            <Typography
              variant="nav"
              color="#000"
              component="a"
              href="/contact"
              sx={{ textDecoration: 'none', '&:hover': { color: '#db9662' } }}
            >
              CONTACT
            </Typography>
          </Box>

          <Typography
            variant="nav"
            color="#000"
            sx={{
              textAlign: 'right',
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
