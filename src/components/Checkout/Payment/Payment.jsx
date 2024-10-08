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
  FormControlLabel,
  OutlinedInput,
  FormLabel,
  Checkbox,
} from '@mui/material';
import MuiCard from '@mui/material/Card';

import { styled } from '@mui/material/styles';

import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { MoMoIcon } from '~/components/Icons';

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

function PaymentForm({ paymentMethod, setPaymentMethod }) {
  const [paymentType, setPaymentType] = useState('cash');

  const handlePaymentTypeChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <Stack spacing={3} useFlexGap>
      <Typography variant="h3">Payment details</Typography>
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
                sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
              >
                <AttachMoneyIcon
                  fontSize="medium"
                  sx={(theme) => ({
                    color:
                      paymentType === 'cash'
                        ? theme.palette.primary.main
                        : theme.palette.grey[400],
                  })}
                />

                <Typography variant="nav" color="rgb(154, 154, 154)">
                  Cash on delivery
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card selected={paymentMethod === 'momo'}>
            <CardActionArea onClick={() => setPaymentMethod('momo')}>
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <MoMoIcon height="2rem" width="2rem" />

                <Typography variant="nav" color="rgb(154, 154, 154)">
                  MoMo
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>

      {paymentMethod === 'momo' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} mb={3}>
          <Typography>Thanh toán bằng ví điện tử MoMo</Typography>
          <Typography>MÃ QR, quét để thanh toán</Typography>
        </Box>
      )}

      {paymentMethod === 'cash' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            <Typography variant="text1">
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
