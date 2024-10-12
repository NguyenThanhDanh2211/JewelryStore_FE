import { Box, Card, Grid, Stack, styled, Typography } from '@mui/material';
import { CartOutline, Package, Return, Truck } from '~/components/Icons';

const AboutContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 2,
  justifyContent: 'center',
  alignItems: 'center',
}));

const MuiCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(3),
  paddingTop: theme.spacing(10),
  margin: 'auto',
  backgroundColor: '#f5f5f5',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '1300px',
}));

function About() {
  return (
    <AboutContainer direction="column">
      <MuiCard variant="outlined" sx={{ border: 'none' }}>
        <Grid container item xs={12}>
          <Grid
            item
            xs={3}
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Truck />
            <Typography my={2} variant="h2">
              QUICK DELIVERY
            </Typography>
            <Typography variant="text">
              Inside City delivery within 5 days
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <CartOutline />
            <Typography my={2} variant="h2">
              PICK UP IN STORE
            </Typography>
            <Typography variant="text">
              We have option of pick up in store
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Package />
            <Typography my={2} variant="h2">
              SPECIAL PACKAGING
            </Typography>
            <Typography variant="text">
              Our packaging is best for products
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Return />
            <Typography my={2} variant="h2">
              RETURN POLICY
            </Typography>
            <Typography variant="text">
              We will take return in some cases
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{ maxWidth: '1300px', my: '50px' }}
          display="flex"
          flexDirection="column"
        >
          <Typography variant="h3">How We Started?</Typography>
          <Typography
            variant="text"
            textAlign="justify"
            sx={{ marginY: '40px' }}
          >
            Our journey began with a vision to create something unique, driven
            by passion and the desire to innovate. Through persistence and
            collaboration, we built a foundation rooted in strong values and
            customer-focused service. Our commitment to quality, paired with a
            relentless pursuit of excellence, allowed us to overcome challenges
            and grow. From humble beginnings, we've continuously evolved, always
            striving to meet the ever-changing needs of our customers.
          </Typography>
          <Typography variant="h3">What we stand for as a business?</Typography>
          <Typography
            variant="text"
            textAlign="justify"
            sx={{ marginTop: '40px' }}
          >
            As a business, we believe in integrity, quality, and innovation. Our
            mission is to provide exceptional products that not only meet but
            exceed expectations. We are committed to creating an inclusive and
            ethical environment, where each customer experience is prioritized.
            Sustainability and responsibility guide our decisions as we continue
            to innovate and adapt to future challenges, ensuring that we leave a
            positive impact on both our community and the world.
          </Typography>
        </Box>
      </MuiCard>
    </AboutContainer>
  );
}

export default About;
