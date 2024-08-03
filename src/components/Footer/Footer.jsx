import { Typography, IconButton, Input, Link } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CopyrightIcon from '@mui/icons-material/Copyright';

import logo from '~/assets/images/logo-regular.png';

const ariaLabel = { 'aria-label': 'description' };
const theme = createTheme({
  typography: {
    customTitle: {
      textTransform: 'none',
      fontSize: '1.6rem',
      margin: '5px',
    },
    mainTitle: {
      textTransform: 'none',
      fontSize: '3rem',
      fontWeight: '300',
      fontStyle: 'italic',
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
          padding: '10px',
          fontFamily: 'Cormorant Garamond, serif',
          width: '75%',
        },
      },
    },
  },
});

function Footer() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <hr style={{ margin: '20px' }}></hr>

        <ThemeProvider theme={theme}>
          <Grid container spacing={2} columns={16}>
            <Grid
              item
              xs={8}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                component="img"
                alt="Jewelry Store"
                src={logo}
                sx={{ height: '70px', marginBottom: 2 }}
              />
              <Typography variant="customTitle">
                nguyenthanhdanh221102@gmail.com
              </Typography>
              <Typography variant="customTitle">+84 789 604 xxx</Typography>
              <Typography variant="customTitle">
                Vinh Long City - Can Tho City, Viet Nam
              </Typography>

              <Box sx={{ flexGrow: 1, marginTop: 2 }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <IconButton
                      color="inherit"
                      href="https://facebook.com/ng.thzanh"
                      component={Link}
                    >
                      <FacebookIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      color="inherit"
                      href="https://instagram.com/ng.thdanh"
                      component={Link}
                    >
                      <InstagramIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      color="inherit"
                      href="https://github.com/NguyenThanhDanh2211"
                      component={Link}
                    >
                      <GitHubIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      color="inherit"
                      href="https://youtube.com"
                      component={Link}
                    >
                      <YouTubeIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid
              item
              xs={8}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="mainTitle">
                Subscribe to get our daily updates
              </Typography>
              <Input
                placeholder="Write your email address here..."
                inputProps={ariaLabel}
                sx={{ marginTop: 2 }}
              />
            </Grid>
          </Grid>
        </ThemeProvider>
      </Box>
      <hr style={{ margin: '20px' }}></hr>
      <Box sx={{ flexGrow: 1, marginBottom: '5px', textAlign: 'center' }}>
        <Typography variant="customTitle">
          <CopyrightIcon sx={{ fontSize: '1rem' }} />
          2024 Copyright Accessories. HTML Template by TemplatesJungle
        </Typography>
      </Box>
    </>
  );
}

export default Footer;
