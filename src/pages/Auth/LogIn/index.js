import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import {
  Card,
  Stack,
  Box,
  Checkbox,
  CssBaseline,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
  FormControlLabel,
  Button,
  Divider,
  Alert,
  LinearProgress,
} from '@mui/material';
import { FacebookIcon, GoogleIcon } from '~/components/Icons';
import { login } from '~/services/userService';
import Navbar from '~/components/Navbar';
import ForgotPassword from '~/components/ForgotPassword';

const LogInContainer = styled(Stack)(({ theme }) => ({
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
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

function Login() {
  const defaultTheme = createTheme();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('Log in successful!');

    try {
      const response = await login(userData);

      if (response && response.token) {
        localStorage.setItem('authToken', response.token);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
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
    <>
      <Navbar />
      <ThemeProvider theme={defaultTheme}></ThemeProvider>
      <CssBaseline enableColorScheme />
      <LogInContainer direction="column" justifyContent="space-between">
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
          <Typography variant="body1">Log In</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                required
                fullWidth
                sx={{ ariaLabel: 'email' }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  component="button"
                  onClick={(e) => {
                    e.preventDefault(); // Prevents form submission
                    handleClickOpen();
                  }}
                  variant="body2"
                  sx={{ alignSelf: 'baseline' }}
                >
                  Forget your password?
                </Link>
              </Box>
              <TextField
                placeholder="••••••"
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
              />
            </FormControl>
            <FormControlLabel
              variant="body2"
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button type="submit" disabled={loading} fullWidth variant="single">
              Log in
            </Button>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <span>
                <Link
                  href="/register"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Register
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
              onClick={() => alert('Log in with Google')}
              startIcon={<GoogleIcon />}
            >
              Log in with Google
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="single"
              onClick={() => alert('Log in with Facebook')}
              startIcon={<FacebookIcon />}
            >
              Log in with Facebook
            </Button>
          </Box>
        </MuiCard>
      </LogInContainer>
    </>
  );
}

export default Login;
