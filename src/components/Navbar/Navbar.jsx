import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Stack,
  Box,
  Link,
  Grid,
  IconButton,
  Avatar,
  Badge,
  Typography,
} from '@mui/material';

import logo from '~/assets/images/logo-regular.png';
import { CartIcon, SearchIcon, UserIcon } from '~/components/Icons';
import { me } from '~/services/userService';
import MenuUser from './MenuUser';
import CartDrawer from '../CartDrawer';
import SearchDrawer from '../SearchDrawer';
import { CartContext } from '~/contexts/CartContext';
import ShopDropdown from './ShopDropDown';

const NavbarContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'isFixed',
})(({ theme, isFixed }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(6),
  backgroundColor: '#f5f5f5',
  transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
  opacity: 1,
  ...(isFixed && {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(7px)',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  }),
}));

function Navbar() {
  const [userName, setUserName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSearchOpen, setDrawerSearchOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const [anchorShopEl, setAnchorShopEl] = useState(null);

  const handleShopHover = (e) => {
    setAnchorShopEl(e.currentTarget);
  };

  const handleShopClose = () => {
    setAnchorShopEl(null);
  };

  const location = useLocation();

  const handleScroll = () => {
    if (window.scrollY >= 250) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { cart, fetchCart } = useContext(CartContext);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserDetails(token);
      fetchCart();
    }
  }, [fetchCart]);

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

  const toggleSearchDrawer = (open) => () => {
    setDrawerSearchOpen(open);
  };

  const handleCartIconClick = () => {
    if (location.pathname !== '/cart') {
      toggleDrawer(true)(); // Open CartDrawer if not on the cart page
    }
  };

  return (
    <NavbarContainer
      direction="column"
      justifyContent="space-between"
      isFixed={isFixed}
    >
      <>
        <Grid container sx={{ gap: 2 }}>
          <Grid
            item
            sx={{
              position: 'absolute',
              left: '30px',
              transform: 'translateY(-50%)',
              display: 'flex',
            }}
          >
            <Grid container spacing={4} display="flex" ml={1}>
              {/* HOME link */}
              <Grid item key="home">
                <Link
                  color={
                    location.pathname === '/' ? '#db9662' : 'rgb(154, 154, 154)'
                  }
                  sx={{
                    textDecoration: 'none',
                    fontWeight:
                      location.pathname === '/' ? 'bold' : 'rgb(154, 154, 154)',
                    '&:hover': {
                      color: '#db9662',
                    },
                  }}
                  href="/"
                >
                  <Typography variant="nav">HOME</Typography>
                </Link>
              </Grid>

              {/* SHOP link with dropdown */}
              <Grid item>
                <Box
                  onMouseEnter={handleShopHover}
                  onMouseLeave={handleShopClose}
                  color={
                    location.pathname.startsWith('/shop')
                      ? '#db9662'
                      : 'rgb(154, 154, 154)'
                  }
                >
                  <Typography variant="nav">SHOP</Typography>
                  <ShopDropdown
                    anchorShopEl={anchorShopEl}
                    handleShopClose={handleShopClose}
                  />
                </Box>
              </Grid>

              {/* ABOUT link */}
              <Grid item key="about">
                <Link
                  color={
                    location.pathname === '/about'
                      ? '#db9662'
                      : 'rgb(154, 154, 154)'
                  }
                  sx={{
                    textDecoration: 'none',
                    fontWeight:
                      location.pathname === '/about'
                        ? 'bold'
                        : 'rgb(154, 154, 154)',
                    '&:hover': {
                      color: '#db9662',
                    },
                  }}
                  href="/about"
                >
                  <Typography variant="nav">ABOUT</Typography>
                </Link>
              </Grid>

              {/* CONTACT link */}
              <Grid item key="contact">
                <Link
                  color={
                    location.pathname === '/contact'
                      ? '#db9662'
                      : 'rgb(154, 154, 154)'
                  }
                  sx={{
                    textDecoration: 'none',
                    fontWeight:
                      location.pathname === '/contact'
                        ? 'bold'
                        : 'rgb(154, 154, 154)',
                    '&:hover': {
                      color: '#db9662',
                    },
                  }}
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
            display="flex"
            mr={4}
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
                <IconButton color="inherit" onClick={toggleSearchDrawer(true)}>
                  <SearchIcon />
                </IconButton>
                <SearchDrawer
                  open={drawerSearchOpen}
                  toggleSearchDrawer={toggleSearchDrawer}
                />
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
      </>
    </NavbarContainer>
  );
}

export default Navbar;
