import {
  FormLabel,
  Grid,
  OutlinedInput,
  styled,
  Typography,
  FormControlLabel,
  Checkbox,
  Stack,
} from '@mui/material';

const AddressContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

function Address() {
  return (
    <AddressContainer direction="column" justifyContent="flex-end">
      <Typography variant="h3">Customer information</Typography>
      <Grid container spacing={2}>
        <FormGrid xs={12} item>
          <FormLabel htmlFor="name" required>
            Full name
          </FormLabel>
          <OutlinedInput
            id="name"
            name="name"
            type="name"
            placeholder="Nguyen Thanh Danh"
            autoComplete="name"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid xs={12} item>
          <FormLabel htmlFor="numberPhone" required>
            Number phone
          </FormLabel>
          <OutlinedInput
            id="numberPhone"
            name="numberPhone"
            type="numberPhone"
            placeholder="+84 123 456 789"
            autoComplete="number phone"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid xs={12} item>
          <FormLabel htmlFor="address" required>
            Address
          </FormLabel>
          <OutlinedInput
            id="address"
            name="address"
            type="address"
            placeholder="Street name and number"
            autoComplete="shipping address"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid xs={12} item>
          <FormControlLabel
            control={<Checkbox name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </FormGrid>
      </Grid>
    </AddressContainer>
  );
}

export default Address;
