import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Card,
  Stack,
  Box,
  Link,
  Grid,
  IconButton,
  Avatar,
  Badge,
  Divider,
  Typography,
  // Slide,
} from '@mui/material';

import logo from '~/assets/images/logo-regular.png';
import { CartIcon, SearchIcon, UserIcon } from '~/components/Icons';
import { me } from '~/services/userService';
import MenuUser from '../MenuUser';
import CartDrawer from '../CartDrawer';
import { CartContext } from '~/contexts/CartContext';

const NavbarContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(1),
  backgroundColor: '#f5f5f5',
}));

const MuiCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(6),
  margin: 'auto',
  backgroundColor: '#f5f5f5',
}));

function Navbar() {
  const [userName, setUserName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { cart, fetchCart } = useContext(CartContext);

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      fetchUserDetails(token);

      fetchCart();
    }
  }, []);

  const fetchUserDetails = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await me(token);

        setUserName(response.name);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    }
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleCartIconClick = () => {
    if (location.pathname !== '/cart') {
      toggleDrawer(true)(); // Open CartDrawer if not on the cart page
    }
  };

  return (
    <>
      {/* <Slide direction="down" in={showNavbar}> */}
      <NavbarContainer direction="column" justifyContent="space-between">
        <MuiCard variant="outlined" sx={{ border: 'none' }}>
          <Grid container sx={{ gap: 2 }}>
            {/* nav */}
            <Grid
              item
              sx={{
                position: 'absolute',
                left: '30px',
                transform: 'translateY(-50%)',
                display: 'flex',
              }}
            >
              <Grid container spacing={4}>
                <Grid item>
                  <Link
                    color="inherit"
                    sx={{ textDecoration: 'none' }}
                    href="/"
                  >
                    <Typography variant="nav">HOME</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    color="inherit"
                    sx={{ textDecoration: 'none' }}
                    href="/shop"
                  >
                    <Typography variant="nav">SHOP</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    color="inherit"
                    sx={{ textDecoration: 'none' }}
                    href="/about"
                  >
                    <Typography variant="nav">ABOUT</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    color="inherit"
                    sx={{ textDecoration: 'none' }}
                    href="/contact"
                  >
                    <Typography variant="nav">CONTACT</Typography>
                  </Link>
                </Grid>
              </Grid>
            </Grid>

            {/* logo */}
            <Grid item>
              <Link href="/">
                <Box
                  component="img"
                  alt="Jewelry Store"
                  src={logo}
                  sx={{
                    position: 'absolute',
                    height: '70px',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </Link>
            </Grid>

            {/* icon */}
            <Grid
              item
              sx={{
                position: 'absolute',
                right: '30px',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <IconButton color="inherit">
                    <SearchIcon />
                  </IconButton>
                </Grid>

                <Grid item>
                  <IconButton color="inherit" onClick={handleCartIconClick}>
                    <Badge
                      badgeContent={cart.totalQuantity}
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: '#db9662',
                          color: 'white',
                        },
                      }}
                    >
                      <CartIcon />
                    </Badge>
                  </IconButton>
                  {/* Cart Drawer */}
                  <CartDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
                </Grid>
                <Grid item>
                  {userName ? (
                    <>
                      <IconButton color="inherit" onClick={handleOpenMenu}>
                        <Avatar sx={{ width: '1.6rem', height: '1.6rem' }}>
                          {userName.charAt(0).toUpperCase()}
                        </Avatar>
                      </IconButton>
                      <MenuUser
                        anchorEl={anchorEl}
                        handleCloseMenu={handleCloseMenu}
                      />
                    </>
                  ) : (
                    <Link href="/login" color="inherit">
                      <IconButton color="inherit">
                        <UserIcon />
                      </IconButton>
                    </Link>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MuiCard>
        <Divider></Divider>
      </NavbarContainer>
      {/* </Slide> */}
    </>
  );
}

export default Navbar;
