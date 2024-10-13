import {
  FormLabel,
  Grid,
  OutlinedInput,
  styled,
  Typography,
  FormControlLabel,
  Checkbox,
  Stack,
  FormHelperText,
} from '@mui/material';
import { useEffect } from 'react';

const AddressContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

function Address({ addressData, setAddressData, errors }) {
  // Accept errors prop
  useEffect(() => {
    setAddressData((prev) => ({
      name: prev.name || '',
      phone: prev.phone || '',
      address: prev.address || '',
      saveAddress: prev.saveAddress || false,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <AddressContainer>
      <Typography variant="h3">Customer Information</Typography>
      <Grid container spacing={2}>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="name" required>
            Full Name
          </FormLabel>
          <OutlinedInput
            id="name"
            name="name"
            value={addressData.name || ''}
            onChange={handleChange}
            placeholder="Nguyen Thanh Danh"
            autoComplete="name"
            required
            size="small"
          />
          {errors && errors.name && (
            <FormHelperText error>{errors.name}</FormHelperText>
          )}
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="phone" required>
            Phone Number
          </FormLabel>
          <OutlinedInput
            id="phone"
            name="phone"
            value={addressData.phone || ''}
            onChange={handleChange}
            type="tel"
            placeholder="+84 123 456 789"
            autoComplete="tel"
            required
            size="small"
          />
          {errors && errors.phone && (
            <FormHelperText error>{errors.phone}</FormHelperText>
          )}
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="address" required>
            Address
          </FormLabel>
          <OutlinedInput
            id="address"
            name="address"
            value={addressData.address || ''}
            onChange={handleChange}
            placeholder="Street name and number"
            autoComplete="shipping address"
            required
            size="small"
          />
          {errors && errors.address && (
            <FormHelperText error>{errors.address}</FormHelperText>
          )}
        </FormGrid>
        <FormGrid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="saveAddress"
                checked={addressData.saveAddress || false}
                onChange={handleChange}
              />
            }
            label="Use this address for payment details"
          />
        </FormGrid>
      </Grid>
    </AddressContainer>
  );
}

export default Address;
