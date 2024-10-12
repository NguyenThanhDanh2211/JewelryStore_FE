import {
  Box,
  Card,
  Grid,
  Stack,
  Link,
  IconButton,
  styled,
  Button,
  OutlinedInput,
  Typography,
} from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';

import contact from '~/assets/images/contact.jpg';

const ContactContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(1),
  backgroundColor: '#f5f5f5',
}));

const MuiCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(3),
  margin: 'auto',
  backgroundColor: '#f5f5f5',
}));

function Contact() {
  return (
    <ContactContainer direction="column">
      <MuiCard variant="outlined" sx={{ border: 'none' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sx={{ marginTop: '30px' }}>
            <Box
              component="img"
              src={contact}
              sx={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <Typography variant="h3" sx={{ my: '10px' }}>
              Contact Information
            </Typography>
            <Typography variant="text">
              Feel free to reach out to us for any inquiries or support. We're
              here to assist you with all your needs.
            </Typography>
            <Grid container spacing={8}>
              <Grid item xs={6} display="flex" flexDirection="column">
                <Typography variant="h3" my={2}>
                  Office
                </Typography>
                <Typography variant="text" mb={1}>
                  Campus 2, 3/2 Street, Xuan Khanh Ward, Ninh Kieu District, Can
                  Tho City.
                </Typography>
                <Typography variant="text" my={1}>
                  +84 789 604 722
                </Typography>
                <Typography variant="text" my={1}>
                  nguyenthanhdanh221102@gmail.com
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h3" my={2}>
                  Social Info
                </Typography>
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
            </Grid>
          </Grid>
          <Grid item xs={6} mt={3} display="flex" flexDirection="column">
            <Typography variant="h3">Got Any Questions?</Typography>
            <Typography variant="text" my={2}>
              Use the form below to get in touch with us.
            </Typography>
            <Box>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="text1">Your Name*</Typography>
                    <OutlinedInput
                      // autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="name"
                      placeholder="Write Your Name Here"
                      type="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="text1">Your E-mail*</Typography>
                    <OutlinedInput
                      // autoFocus
                      required
                      margin="dense"
                      id="email"
                      name="email"
                      placeholder="Write Your Email Here"
                      type="email"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Box display="flex" flexDirection="column">
                <Typography variant="text1" mt={2}>
                  Phone Number
                </Typography>
                <OutlinedInput
                  // autoFocus
                  required
                  margin="dense"
                  id="phoneNumber"
                  name="phone number"
                  placeholder="Write Your Phone Number Here"
                  type="text"
                  fullWidth
                />

                <Typography variant="text1" mt={2}>
                  Subject
                </Typography>
                <OutlinedInput
                  // autoFocus
                  required
                  margin="dense"
                  id="subject"
                  name="subject"
                  placeholder="Write Your Subject Here"
                  type="text"
                  fullWidth
                />

                <Typography variant="text1" mt={2}>
                  Your Message*
                </Typography>
                <OutlinedInput
                  // autoFocus
                  required
                  margin="dense"
                  id="message"
                  name="message"
                  placeholder="Write Your Message Here"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                />

                <Button
                  // onClick={handleClose}
                  variant="single"
                  fullWidth
                  type="submit"
                  sx={{
                    my: '10px',
                  }}
                >
                  SUBMIT
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </MuiCard>
    </ContactContainer>
  );
}

export default Contact;
