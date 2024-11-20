import { Typography, Box } from '@mui/material';

function Review({ addressData, paymentMethod }) {
  return (
    <>
      <Typography variant="h2">Review your order</Typography>

      <Box display="flex" flexDirection="column">
        <Typography variant="nav" mt={3} fontSize="18px" gutterBottom>
          Shipment details
        </Typography>
        <Typography variant="text" gutterBottom>
          {addressData.name}
        </Typography>
        <Typography variant="text" gutterBottom>
          {addressData.phone}
        </Typography>
        <Typography variant="text" gutterBottom>
          {addressData.address}
        </Typography>

        <Typography variant="nav" fontSize="18px" mt={3} gutterBottom>
          Payment Method
        </Typography>
        <Typography variant="text" gutterBottom mb={3}>
          {paymentMethod === 'momo' ? 'Momo' : 'Cash on Delivery'}
        </Typography>
      </Box>
    </>
  );
}

export default Review;
