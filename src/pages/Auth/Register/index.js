import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Card,
  Stack,
  TextField,
  Typography,
  Box,
  FormLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Divider,
  Alert,
  LinearProgress,
  CircularProgress,
} from '@mui/material';
import { GoogleIcon, FacebookIcon } from '~/components/Icons';
import { register } from '~/services/userService';

const RegisterContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  width: '100%',
  paddingTop: '25px',
  paddingBottom: '25px',
  backgroundColor: '#f5f5f5',
}));

const MuiCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);

    const userData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    };

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await register(userData);
      if (!response) {
        throw new Error('Registration failed.');
      }

      setSuccessMessage('Registration successful!');
      setErrorMessage('');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }
    return isValid;
  };

  return (
    <RegisterContainer direction="column" justifyContent="space-between">
      {(successMessage || errorMessage) && (
        <Box
          sx={{
            position: 'fixed',
            right: 35,
          }}
        >
          <Alert severity={successMessage ? 'success' : 'error'}>
            <Typography variant="text">
              {successMessage || errorMessage}
            </Typography>
          </Alert>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={successMessage ? 'success' : 'error'}
          />
        </Box>
      )}

      <MuiCard>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 600 }}>
          Create an Account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="name">Full name</FormLabel>
            <TextField
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              placeholder="Nguyen Thanh Danh"
              error={nameError}
              helperText={nameErrorMessage}
              color={nameError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder="your@gmail.com"
              name="email"
              autoComplete="email"
              error={emailError}
              helperText={emailErrorMessage}
              color={emailError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              fullWidth
              type="password"
              name="password"
              placeholder="••••••"
              id="password"
              autoComplete="new-password"
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive updates via email."
          />
          <Button
            id="btn-register"
            type="submit"
            fullWidth
            variant="single"
            onClick={validateInputs}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <span>
              <Link href="/login" variant="body2" sx={{ alignSelf: 'center' }}>
                Log in
              </Link>
            </span>
          </Typography>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            type="submit"
            fullWidth
            variant="single"
            onClick={() => alert('Register with Google')}
            startIcon={<GoogleIcon />}
          >
            Register with Google
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="single"
            onClick={() => alert('Register with Facebook')}
            startIcon={<FacebookIcon />}
          >
            Register with Facebook
          </Button>
        </Box>
      </MuiCard>
    </RegisterContainer>
  );
}

export default Register;
