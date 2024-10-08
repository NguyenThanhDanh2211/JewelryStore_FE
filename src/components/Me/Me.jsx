import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  OutlinedInput,
  styled,
  Stack,
  Alert,
  LinearProgress,
  Card,
} from '@mui/material';
import { me, update } from '~/services/userService';

const MeContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  // padding: 20,
  padding: theme.spacing(1),
  // backgroundColor: '#f5f5f5',
}));

const MuiCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: ' center',
  width: '100%',
  padding: theme.spacing(4),
  // gap: theme.spacing(2),
  margin: 'auto',
  // maxWidth: '1200px',
  backgroundColor: '#f5f5f5',
}));

function Me() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await me(token);
      setUserName(response.name);
      setEmail(response.email);
      setPhoneNumber(response.phone || '');
      setAddress(response.address || '');
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const userData = {
      name: userName,
      email,
      phone: phoneNumber,
      address,
    };

    setErrorMessage('');
    setSuccessMessage('Profile updated successfully!');

    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        await update(userData, token);
        // You may want to add a success message or redirect after update
      } catch (error) {
        console.log('Error updating profile:', error);
        setErrorMessage(
          error.response?.data?.message || 'Error updating profile'
        );
        setSuccessMessage('');
      }
    }
  };

  useEffect(() => {
    if (errorMessage || successMessage) {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            setErrorMessage('');
            setSuccessMessage('');
            return 0;
          }
          return Math.min(oldProgress + 10, 200);
        });
      }, 370);
      return () => clearInterval(timer);
    }
  }, [errorMessage, successMessage]);

  return (
    <MeContainer direction="column" justifyContent="space-between">
      {(successMessage || errorMessage) && (
        <Box sx={{ position: 'fixed', right: 35 }}>
          <Alert security={successMessage ? 'success' : 'error'}>
            {successMessage || errorMessage}
          </Alert>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={successMessage ? 'success' : 'error'}
          />
        </Box>
      )}

      <MuiCard
        component="form"
        onSubmit={handleUpdate}
        variant="outlined"
        sx={{ border: 'none' }}
      >
        <Typography variant="h3">Welcome, {userName}</Typography>
        <Typography variant="body1">Your Account</Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="text1">Your Name</Typography>
              <OutlinedInput
                required
                margin="dense"
                id="name"
                name="name"
                placeholder="Write Your Name Here"
                type="text"
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="text1">Your E-mail</Typography>
              <OutlinedInput
                required
                margin="dense"
                id="email"
                name="email"
                placeholder="Write Your Email Here"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box display="flex" flexDirection="column">
            <Typography variant="text1" mt={2}>
              Phone Number
            </Typography>
            <OutlinedInput
              required
              margin="dense"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Write Your Phone Number Here"
              type="text"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <Typography variant="text1" mt={2}>
              Address
            </Typography>
            <OutlinedInput
              required
              margin="dense"
              id="address"
              name="address"
              placeholder="Write Your Address Here"
              type="text"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <Button
              variant="single"
              fullWidth
              type="submit"
              sx={{
                my: '10px',
              }}
            >
              UPDATE PROFILE
            </Button>
          </Box>
        </Box>
      </MuiCard>
    </MeContainer>
  );
}

export default Me;
