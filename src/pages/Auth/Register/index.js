import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import {
  Card,
  CssBaseline,
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
} from '@mui/material';
import { GoogleIcon, FacebookIcon } from '~/components/Icons';
import { register } from '~/services/userService';
import Navbar from '~/components/Navbar';

const RegisterContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 20,
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
  const defaultTheme = createTheme();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [progress, setProgress] = useState(0);

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

  return (
    <>
      <Navbar />
      <ThemeProvider theme={defaultTheme}> </ThemeProvider>
      <CssBaseline enableColorScheme />
      <RegisterContainer direction="column" justifyContent="space-between">
        {(successMessage || errorMessage) && (
          <Box
            sx={{
              position: 'fixed',
              right: 35,
            }}
          >
            <Alert severity={successMessage ? 'success' : 'error'}>
              {successMessage || errorMessage}
            </Alert>
            <LinearProgress
              variant="determinate"
              value={progress}
              color={successMessage ? 'success' : 'error'}
            />
          </Box>
        )}

        <MuiCard>
          <Typography variant="body1">Register</Typography>

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
                placeholder="Thanh Danh"
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
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
            <Button type="submit" fullWidth variant="single" disabled={loading}>
              Register
            </Button>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <span>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
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
    </>
  );
}

export default Register;
