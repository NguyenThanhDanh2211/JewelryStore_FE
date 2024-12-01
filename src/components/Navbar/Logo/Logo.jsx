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
} from '@mui/material';

import logo from '~/assets/images/logo-regular.png';
import { CartIcon, SearchIcon, UserIcon } from '~/components/Icons';
import MenuUser from '../MenuUser';
import CartDrawer from '../../CartDrawer';
import { CartContext } from '~/contexts/CartContext';
import { AuthContext } from '~/contexts/AuthContext';
import SearchDrawer from '~/components/SearchDrawer';
import LinkCo from '../Link';

const LogoContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
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
      <LogoContainer
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: '70px', position: 'relative' }}
      >
        {/* Logo */}
        <Grid item>
          <Link href="/">
            <Box
              ml={1}
              component="img"
              alt="Jewelry Store"
              src={logo}
              sx={{
                height: '40px',
              }}
            />
          </Link>
        </Grid>

        {/* LinkCo ở trung tâm */}
        <Grid
          item
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <LinkCo />
        </Grid>

        {/* Icon */}
        <Grid
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 2,
          }}
        >
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

          <IconButton
            color="inherit"
            id="cart-icon"
            onClick={handleCartIconClick}
          >
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
              <MenuUser anchorEl={anchorEl} handleCloseMenu={handleCloseMenu} />
            </>
          ) : (
            <Link href="/login" color="inherit">
              <IconButton id="auth" color="inherit">
                <UserIcon />
              </IconButton>
            </Link>
          )}
        </Grid>
      </LogoContainer>
      <Divider />
    </>
  );
}

export default Logo;
