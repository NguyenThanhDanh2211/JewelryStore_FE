import {
  Box,
  Button,
  Grid,
  Link,
  Stack,
  Step,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from '@mui/material';
import YourOrder from './YourOrder';
import Address from './Address';
import Payment from './Payment';
import Review from './Review';
import React, { useState } from 'react';
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';

const CheckoutContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  maxWidth: '1200px',
  padding: theme.spacing(1),
  margin: 'auto',
}));

const steps = ['Customer information', 'Payment details', 'Review your order'];
function getStepContent(step) {
  switch (step) {
    case 0:
      return <Address />;
    case 1:
      return <Payment />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <CheckoutContainer>
      <Grid item container xs={12} spacing={10}>
        <Grid item xs={5}>
          <Box
            sx={{
              position: 'sticky',
              top: '10px',
              alignSelf: 'flex-start',
            }}
          >
            <YourOrder />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
              marginTop: '10px',
            }}
          >
            <Stepper
              id="desktop-stepper"
              activeStep={activeStep}
              sx={{ width: '100%', height: 40 }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              mt: '15px',
            }}
          >
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Your order number is
                  <strong>&nbsp;#140396</strong>. We have emailed your order
                  confirmation and will update you once its shipped.
                </Typography>
                <Link href="/">
                  <Button
                    variant="single"
                    sx={{
                      alignSelf: 'start',
                      width: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    Go to my orders
                  </Button>
                </Link>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={[
                    {
                      display: 'flex',
                      flexDirection: 'row',
                      alignContent: 'end',
                      flexGrow: 1,
                      gap: 1,
                    },
                    activeStep !== 0
                      ? { justifyContent: 'space-between' }
                      : { justifyContent: 'flex-end' },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRounded />}
                      onClick={handleBack}
                      variant="text"
                      display="flex"
                      sx={{ border: 'none' }}
                    >
                      Previous
                    </Button>
                  )}

                  <Button
                    variant="single"
                    endIcon={<ChevronRightRounded />}
                    onClick={handleNext}
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </CheckoutContainer>
  );
}

export default Checkout;
