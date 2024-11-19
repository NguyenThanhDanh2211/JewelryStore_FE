import {
  Box,
  Grid,
  styled,
  Typography,
  IconButton,
  Link,
  Divider,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

import logo from '~/assets/images/logo-regular.png';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f4f2ec',
  padding: theme.spacing(4, 2),
  borderTop: '1px solid #ddd',
}));

const FooterLogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
}));

const FooterLink = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: '#555',
  cursor: 'pointer',
  '&:hover': {
    color: '#db9662',
  },
}));

const SocialIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

function Footer() {
  return (
    <FooterContainer>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <FooterLogo>
            <Box
              component="img"
              src={logo}
              alt="Jewelry Store Logo"
              sx={{ height: 30 }}
            />
            <Typography variant="body2" color="textSecondary">
              Thank you to the team at <strong>DJWENO</strong> for allowing us
              to feature their beautiful imagery. Head over to their official
              store to shop their latest collection.
            </Typography>
          </FooterLogo>
          <SocialIcons>
            <IconButton href="https://facebook.com/ng.thzanh" component={Link}>
              <FacebookIcon />
            </IconButton>
            <IconButton href="https://instagram.com/ng.thdanh" component={Link}>
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://github.com/NguyenThanhDanh2211"
              component={Link}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton href="https://youtube.com" component={Link}>
              <YouTubeIcon />
            </IconButton>
          </SocialIcons>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography variant="h3" gutterBottom>
            Get to Know Us
          </Typography>
          <FooterLink>Careers</FooterLink>
          <FooterLink>About Djewno</FooterLink>
          <FooterLink>Investor Relations</FooterLink>
          <FooterLink>Customer Reviews</FooterLink>
          <FooterLink>Social Responsibility</FooterLink>
          <FooterLink>Store Locations</FooterLink>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography variant="h3" gutterBottom>
            Let Us Help You
          </Typography>
          <FooterLink>Accessibility Statement</FooterLink>
          <FooterLink>Your Orders</FooterLink>
          <FooterLink>Returns & Replacements</FooterLink>
          <FooterLink>Shipping Rates & Policies</FooterLink>
          <FooterLink>Privacy Policy</FooterLink>
          <FooterLink>Terms & Conditions</FooterLink>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h3" gutterBottom>
            Newsletter
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: 1,
              width: '100%',
            }}
          >
            <Box
              component="input"
              placeholder="Enter your email"
              sx={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none',
                '&:focus': {
                  borderColor: '#db9662',
                },
              }}
            />
            <Box
              component="button"
              sx={{
                backgroundColor: '#db9662',
                color: '#fff',
                padding: '10px 16px',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: '#bf8552',
                },
              }}
            >
              SEND
            </Box>
          </Box>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 1, fontSize: '12px' }}
          >
            By subscribing, you agree to our{' '}
            <strong>Terms & Conditions and Privacy & Cookies Policy.</strong>
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Typography
        variant="body2"
        color="textSecondary"
        textAlign="center"
        sx={{ pt: 2 }}
      >
        Copyright © 2024 DJEWNO. All rights reserved.
      </Typography>
    </FooterContainer>
  );
}

export default Footer;
