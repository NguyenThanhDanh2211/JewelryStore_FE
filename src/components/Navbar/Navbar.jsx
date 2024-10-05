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
  Typography,
} from '@mui/material';

import logo from '~/assets/images/logo-regular.png';
import { CartIcon, SearchIcon, UserIcon } from '~/components/Icons';
import { me } from '~/services/userService';
import MenuUser from '../MenuUser';
import CartDrawer from '../CartDrawer';
import SearchDrawer from '../SearchDrawer';
import { CartContext } from '~/contexts/CartContext';

const NavbarContainer = styled(Stack)(({ theme, isFixed }) => ({
  height: '90px',
  padding: theme.spacing(1),
  backgroundColor: '#f5f5f5',
  transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
  opacity: 1,
  transform: 'translateY(0)',
  ...(isFixed && {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  }),
}));

const MuiCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(2),
  margin: 'auto',
  backgroundColor: '#f5f5f5',
}));

const navLinks = [
  { label: 'HOME', path: '/' },
  { label: 'SHOP', path: '/product' },
  { label: 'ABOUT', path: '/about' },
  { label: 'CONTACT', path: '/contact' },
];

function Navbar() {
  const [userName, setUserName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSearchOpen, setDrawerSearchOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

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
              {navLinks.map((link) => (
                <Grid item key={link.label}>
                  <Link
                    color={
                      location.pathname === link.path
                        ? '#db9662'
                        : 'rgb(154, 154, 154)'
                    }
                    sx={{
                      textDecoration: 'none',
                      fontWeight:
                        location.pathname === link.path
                          ? 'bold'
                          : 'rgb(154, 154, 154)',
                      '&:hover': {
                        color: '#db9662',
                      },
                    }}
                    href={link.path}
                  >
                    <Typography variant="nav">{link.label}</Typography>
                  </Link>
                </Grid>
              ))}
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
      </MuiCard>
    </NavbarContainer>
  );
}

export default Navbar;
