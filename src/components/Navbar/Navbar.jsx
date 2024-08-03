import { useState } from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Link,
  Grid,
} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import logo from '~/assets/images/logo-regular.png';
import Search from '../Search';

const theme = createTheme({
  typography: {
    customTitle: {
      textTransform: 'none',
      fontSize: '1.2rem',
      '&:hover': {
        color: '#9A9A9A',
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#FAF7F5',
    },
  },
});

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch((prevShowSearch) => !prevShowSearch);
  };

  return (
    <Box
      sx={{
        height: '80px',
        position: 'static',
        marginTop: '10px',
        marginBottom: '5px',
      }}
    >
      <ThemeProvider theme={theme}>
        <AppBar>
          <Toolbar
            sx={{
              height: '80px',
              position: 'static',
            }}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography variant="customTitle">
                      <Link href="/" color="inherit" underline="none">
                        HOME
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="customTitle">
                      <Link href="/about" color="inherit" underline="none">
                        ABOUT
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="customTitle">
                      <Link href="/shop" color="inherit" underline="none">
                        SHOP
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="customTitle">
                      <Link href="/contact" color="inherit" underline="none">
                        CONTACT
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

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
                      transform: 'translateX(-50%)',
                      top: '0px',
                      marginTop: '5px',
                    }}
                  />
                </Link>
              </Grid>

              <Grid item>
                <Grid container spacing={2}>
                  <Grid item>
                    <IconButton color="inherit" onClick={handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                  </Grid>

                  {showSearch && (
                    // <Box
                    //   sx={{
                    //     position: 'fixed',
                    //     top: '50%',
                    //     left: '50%',
                    //     transform: 'translate(-50%, -50%)',
                    //     width: '80%',
                    //     bgcolor: 'background.paper',
                    //     p: 4,
                    //     boxShadow: 24,
                    //     borderRadius: 1,
                    //   }}
                    // >
                    //   <Typography variant="h6" component="div">
                    //     Search
                    //   </Typography>
                    //   {/* <Input
                    //     placeholder="Search..."
                    //     inputProps={ariaLabel}
                    //     fullWidth
                    //     sx={{ marginTop: 2 }}
                    //   /> */}
                    // </Box>
                    <Search />
                  )}
                  <Grid item>
                    <Link href="/cart" color="inherit">
                      <IconButton color="inherit">
                        <ShoppingCartIcon />
                      </IconButton>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/login" color="inherit">
                      <IconButton color="inherit">
                        <AccountCircleOutlinedIcon />
                      </IconButton>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}

export default Navbar;
