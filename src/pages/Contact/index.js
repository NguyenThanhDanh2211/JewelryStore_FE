import Navbar from '~/components/Navbar';
import Footer from '~/components/Footer';
import {
  Box,
  Card,
  Grid,
  Stack,
  Link,
  IconButton,
  styled,
  Button,
  DialogContentText,
  OutlinedInput,
  DialogActions,
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
    <>
      <Navbar />
      <ContactContainer direction="column">
        <MuiCard variant="outlined" sx={{ border: 'none' }}>
          <Grid container spacing={5}>
            <Grid item xs={6} sx={{ marginTop: '30px' }}>
              <Box
                component="img"
                src={contact}
                sx={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <Box component="h1">Contact Information</Box>
              <Grid container spacing={8}>
                <Grid item xs={6}>
                  <Box component="h2">Office</Box>
                  <Box component="p">
                    Campus 2, 3/2 Street, Xuan Khanh Ward, Ninh Kieu District,
                    Can Tho City.
                  </Box>
                  <Box component="p">+84 789 604 722</Box>
                  <Box component="p">nguyenthanhdanh221102@gmail.com</Box>
                </Grid>
                <Grid item xs={6}>
                  <Box component="h2">Social Info</Box>
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
            <Grid item xs={6}>
              <Box component="h1">Got Any Questions?</Box>
              <Box component="p">
                Use the form below to get in touch with us.
              </Box>
              <Box>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <DialogContentText sx={{ my: 1 }}>
                        {' '}
                        Your Name*
                      </DialogContentText>
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
                      <DialogContentText sx={{ my: 1 }}>
                        Your E-mail*
                      </DialogContentText>
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
                <Box>
                  <DialogContentText sx={{ my: 1 }}>
                    Phone Number
                  </DialogContentText>
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
                </Box>
                <Box>
                  <DialogContentText sx={{ my: 1 }}>Subject</DialogContentText>
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
                </Box>
                <Box>
                  <DialogContentText sx={{ my: 1 }}>
                    Your Message*
                  </DialogContentText>
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
                </Box>
                <Box>
                  <DialogActions>
                    <Button
                      fullWidth
                      // onClick={handleClose}
                      variant="contained"
                      type="submit"
                    >
                      SUBMIT
                    </Button>
                  </DialogActions>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </MuiCard>
      </ContactContainer>
      <Footer />
    </>
  );
}

export default Contact;
