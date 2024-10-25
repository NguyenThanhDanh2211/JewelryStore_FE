import {
  Box,
  Card,
  Divider,
  Grid,
  Stack,
  styled,
  Typography,
  IconButton,
  Link,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

import logo from '~/assets/images/logo-regular.png';

const FooterContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(1),
  backgroundColor: '#f5f5f5',
}));

const MuiCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(2),
  margin: 'auto',
  backgroundColor: '#f5f5f5',
  justifyContent: 'center',
  alignItems: 'center',
}));

function Footer() {
  return (
    <>
      <FooterContainer direction="column" justifyContent="space-between">
        <MuiCard variant="outlined" sx={{ border: 'none' }}>
          <Divider sx={{ width: '100%', my: 2 }} />
          <Box
            component="img"
            alt="Jewelry Store"
            src={logo}
            sx={{
              height: '70px',
              marginBottom: '30px',
              my: 2,
            }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'row', m: 2 }}>
            <Grid container spacing={10} justifyContent="center">
              <Grid item xs={2}>
                <Typography variant="body2">FAQ</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">Virtual Shopping</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">Shipping & Returns</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">Create Your Jewelry</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">Ring Sizer</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">Stores</Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid item xs={12} sx={{ m: 2 }}>
            <Grid container spacing={2}>
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
          </Grid>

          <Divider sx={{ width: '100%', my: 2 }} />

          <Typography variant="body2" sx={{ my: 2 }}>
            Copyright © 2024 Jewellery Store.
          </Typography>
        </MuiCard>
      </FooterContainer>
    </>
  );
}

export default Footer;
