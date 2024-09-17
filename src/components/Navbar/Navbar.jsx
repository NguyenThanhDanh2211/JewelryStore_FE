import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Card,
  Stack,
  Typography,
  Box,
  Link,
  Grid,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import logo from '~/assets/images/logo-regular.png';

import { me } from '~/services/meService';

const NavbarContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 4,
  backgroundColor: '#000000',
}));

const MuiCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(8),
  gap: theme.spacing(2),
  margin: 'auto',
}));

function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);

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

  const handleLogout = () => {
    // Remove token from local storage
    navigate('/login');
    localStorage.removeItem('authToken');
    setUserName(null);
  };

  return (
    <>
      <NavbarContainer direction="column" justifyContent="space-between">
        <MuiCard variant="outlined">
          <Grid container sx={{ gap: 2 }}>
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
            <Grid
              item
              sx={{
                // position: 'absolute',
                // right: '-50px',
                // transform: 'translate(-50%, -50%)',
                position: 'absolute',
                right: '20px', // Align to the right edge
                transform: 'translateY(-50%)', // Only translate vertically
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 2, // Spacing between elements
              }}
            >
              <Grid container spacing={2}>
                {userName ? (
                  <>
                    <Grid item>
                      <Typography>Hello, {userName}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography> / </Typography>
                    </Grid>
                    <Grid item>
                      <Link
                        onClick={handleLogout}
                        color="inherit"
                        style={{ cursor: 'pointer' }}
                      >
                        <Typography>Log out</Typography>
                      </Link>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item>
                      <Link href="/login" color="inherit">
                        <Typography>Login</Typography>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Typography> / </Typography>
                    </Grid>
                    <Grid item>
                      <Link href="/register" color="inherit">
                        <Typography>Register</Typography>
                      </Link>
                    </Grid>
                  </>
                )}

                <Grid item>
                  <IconButton color="inherit">
                    <SearchIcon />
                  </IconButton>
                </Grid>

                <Grid item>
                  <Link href="/cart" color="inherit">
                    <IconButton color="inherit">
                      <ShoppingCartIcon />
                    </IconButton>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MuiCard>
      </NavbarContainer>
    </>
  );
}

export default Navbar;
