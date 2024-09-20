import { useEffect, useState } from 'react';
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
} from '@mui/material';

import logo from '~/assets/images/logo-regular.png';
import { CartIcon, SearchIcon, UserIcon } from '~/components/Icons';
import { me } from '~/services/meService';
import MenuUser from '../MenuUser';

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

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      fetchUserDetails(token);
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

  return (
    <>
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
                    HOME
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    color="inherit"
                    sx={{ textDecoration: 'none' }}
                    href="/shop"
                  >
                    SHOP
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    color="inherit"
                    sx={{ textDecoration: 'none' }}
                    href="/about"
                  >
                    ABOUT
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    color="inherit"
                    sx={{ textDecoration: 'none' }}
                    href="/contact"
                  >
                    CONTACT
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
                  <Link href="/cart" color="inherit">
                    <IconButton color="inherit">
                      <Badge badgeContent={4} color="primary">
                        <CartIcon />
                      </Badge>
                    </IconButton>
                  </Link>
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
    </>
  );
}

export default Navbar;
