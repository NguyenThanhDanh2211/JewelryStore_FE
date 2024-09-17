import { useState } from 'react';
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
} from '@mui/material';
import { Facebook, Google } from '@mui/icons-material';
import { login } from '~/services/loginService';
import Navbar from '~/components/Navbar';
import ForgotPassword from '~/components/ForgotPassword';

const LogInContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 20,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
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
    setSuccessMessage('');

    try {
      const response = await login(userData);

      if (response && response.token) {
        localStorage.setItem('authToken', response.token);
        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong.');
      setSuccessMessage(''); // Clear any success message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ThemeProvider theme={defaultTheme}></ThemeProvider>
      <CssBaseline enableColorScheme />
      <LogInContainer direction="column" justifyContent="space-between">
        <MuiCard variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Log In
          </Typography>
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
                // error={emailError}
                // helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                // autoFocus
                required
                fullWidth
                variant="outlined"
                // color={emailError ? 'error' : 'primary'}
                sx={{ ariaLabel: 'email' }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  component="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: 'baseline' }}
                >
                  Forget your password?
                </Link>
              </Box>
              <TextField
                placeholder="••••••"
                // error={passwordError}
                // helperText={passwordErrorMessage}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                // autoFocus
                required
                fullWidth
                variant="outlined"
                // color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={validateInputs}
            >
              Log in
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
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
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              onClick={() => alert('Log in with Google')}
              startIcon={<Google />}
            >
              Log in with Google
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              onClick={() => alert('Log in with Facebook')}
              startIcon={<Facebook />}
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
