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
  Divider,
  InputAdornment,
  InputBase,
} from '@mui/material';

import logo from '~/assets/images/logo-regular.png';
import { CartIcon, SearchIcon, UserIcon } from '~/components/Icons';
import MenuUser from '../MenuUser';
import CartDrawer from '../../CartDrawer';
import { CartContext } from '~/contexts/CartContext';
import { AuthContext } from '~/contexts/AuthContext';
import SearchDrawer from '~/components/SearchDrawer';

const NavbarContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '70px',
  padding: theme.spacing(2),
}));

function Logo() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSearchOpen, setDrawerSearchOpen] = useState(false);

  const location = useLocation();

  const { cart, fetchCart } = useContext(CartContext);
  const { user, isAuthenticated, fetchUser } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUser();
      fetchCart();
    }
  }, [fetchCart, fetchUser]);

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
      toggleDrawer(true)();
    }
  };

  return (
    <>
      <NavbarContainer
        direction="column"
        justifyContent="space-between"
        textAlign="center"
      >
        <Grid container sx={{ gap: 2 }}>
          {/* logo */}
          <Grid item>
            <Link href="/">
              <Box
                component="img"
                alt="Jewelry Store"
                src={logo}
                sx={{
                  position: 'absolute',
                  height: '40px',
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
              right: '0px',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <IconButton
                  id="search-icon"
                  color="inherit"
                  onClick={toggleSearchDrawer(true)}
                >
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
                    <CartIcon color="#2a2d31" />
                  </Badge>
                </IconButton>
                <CartDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
              </Grid>
              <Grid item>
                {isAuthenticated ? (
                  <>
                    <IconButton
                      className="user-icon"
                      color="inherit"
                      onClick={handleOpenMenu}
                    >
                      <Avatar sx={{ width: '1.6rem', height: '1.6rem' }}>
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                    <MenuUser
                      anchorEl={anchorEl}
                      handleCloseMenu={handleCloseMenu}
                    />
                  </>
                ) : (
                  <Link href="/login" color="inherit">
                    <IconButton id="auth" color="inherit">
                      <UserIcon />
                    </IconButton>
                  </Link>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </NavbarContainer>
      <Divider />
    </>
  );
}

export default Logo;
