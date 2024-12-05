import { useState } from 'react';

import {
  Alert,
  Typography,
  Stack,
  Box,
  CardActionArea,
  CardContent,
  FormControl,
  RadioGroup,
  Button,
  CircularProgress,
} from '@mui/material';
import MuiCard from '@mui/material/Card';

import { styled } from '@mui/material/styles';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { MoMoIcon } from '~/components/Icons';
import { payment, checkTransactionStatus } from '~/services/paymentService';

const Card = styled(MuiCard)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.divider,
  width: '100%',

  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        borderColor: theme.palette.primary.light,
      },
    },
  ],
}));

function PaymentForm({
  paymentMethod,
  setPaymentMethod,
  totalPrice,
  onPaymentSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const handlePaymentTypeChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleMoMoPayment = async () => {
    try {
      setLoading(true);

      const response = await payment(Number(totalPrice));

      if (response && response.payUrl) {
        const newWindow = window.open(response.payUrl, '_blank');

        const checkPaymentStatus = setInterval(async () => {
          const paymentResponse = await checkTransactionStatus(
            response.orderId
          );
          if (paymentResponse.resultCode === 0) {
            clearInterval(checkPaymentStatus);
            setLoading(false);
            newWindow.close();
            onPaymentSuccess();
          }
        }, 7000);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3} useFlexGap>
      <Typography variant="h2">Payment details</Typography>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentMethod}
          onChange={handlePaymentTypeChange}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
          }}
        >
          <Card selected={paymentMethod === 'cash'}>
            <CardActionArea
              onClick={() => setPaymentMethod('cash')}
              sx={{
                '.MuiCardActionArea-focusHighlight': {
                  backgroundColor: 'transparent',
                },
                '&:focus-visible': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <CardContent
                id="payment-method-cash"
                sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
              >
                <AttachMoneyIcon
                  fontSize="medium"
                  sx={(theme) => ({
                    color:
                      paymentMethod === 'cash'
                        ? theme.palette.primary.main
                        : theme.palette.grey[400],
                  })}
                />

                <Typography variant="h3" color="rgb(154, 154, 154)">
                  Cash on delivery
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card selected={paymentMethod === 'momo'}>
            <CardActionArea onClick={() => setPaymentMethod('momo')}>
              <CardContent
                id="payment-method-momo"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <MoMoIcon height="2rem" width="2rem" />

                <Typography variant="h3" color="rgb(154, 154, 154)">
                  MoMo
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>

      {paymentMethod === 'momo' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 3,
            alignItems: 'center',
          }}
        >
          <Button
            onClick={handleMoMoPayment}
            variant="single"
            id="open-url-momo"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              transition: 'background-color 0.3s',
              pointerEvents: loading ? 'none' : 'auto',
            }}
          >
            {loading ? (
              <>
                <CircularProgress
                  size={20}
                  sx={{ color: 'rgb(154, 154, 154)', ml: '5px' }}
                />
                Processing...
              </>
            ) : (
              <>Click here to pay with MoMo</>
            )}
          </Button>
        </Box>
      )}

      {paymentMethod === 'cash' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            <Typography variant="text">
              Your order will be processed and shipped with Cash on Delivery
              service.
            </Typography>
          </Alert>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="text" sx={{ color: 'text.secondary' }}>
              Payment method:
            </Typography>
            <Typography variant="text" sx={{ fontWeight: 'medium' }}>
              Cash on Delivery (COD)
            </Typography>
          </Box>
          <Box display="flex" alignContent="center">
            <Typography variant="text" gutterBottom>
              You don't need to make an advance payment. Once your order is
              delivered, please have the total amount ready to pay in cash to
              the delivery agent. Our delivery partner will collect the payment
              directly from you at the time of delivery.
            </Typography>
          </Box>
          <Box display="flex" alignContent="center">
            <Typography variant="text" gutterBottom mb={3}>
              <strong>Important:</strong> <br />
              - Please ensure someone is available at the delivery address to
              receive and pay for the order. <br />
              - Have the exact amount ready as the delivery agent may not carry
              change. <br /> - If you have any questions about your order or the
              payment process, feel free to contact our customer support team.
            </Typography>
          </Box>
        </Box>
      )}
    </Stack>
  );
}

export default PaymentForm;
