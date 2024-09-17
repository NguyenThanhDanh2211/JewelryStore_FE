// import axios from 'axios';
// import { useState } from 'react';
// import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
// import {
//   Card,
//   CssBaseline,
//   Stack,
//   TextField,
//   Typography,
//   Box,
//   FormLabel,
//   FormControl,
//   FormControlLabel,
//   Checkbox,
//   Button,
//   Link,
//   Divider,
// } from '@mui/material';
// import { Facebook, Google } from '@mui/icons-material';
// import Navbar from '~/components/Navbar';

// const RegisterContainer = styled(Stack)(({ theme }) => ({
//   height: '100%',
//   padding: 4,
//   backgroundImage:
//     'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
//   backgroundRepeat: 'no-repeat',
//   ...theme.applyStyles('dark', {
//     backgroundImage:
//       'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
//   }),
// }));

// const MuiCard = styled(Card)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignSelf: 'center',
//   width: '100%',
//   padding: theme.spacing(4),
//   gap: theme.spacing(2),
//   margin: 'auto',
//   boxShadow:
//     'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
//   [theme.breakpoints.up('sm')]: {
//     width: '450px',
//   },
//   ...theme.applyStyles('dark', {
//     boxShadow:
//       'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
//   }),
// }));

// function Register() {
//   const defaultTheme = createTheme();

//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);

//     const userData = {
//       name: data.get('name'),
//       email: data.get('email'),
//       password: data.get('password'),
//     };

//     // console.log(userData);
//     setLoading(true);
//     setErrorMessage('');

//     try {
//       const response = await axios.post(
//         'http://localhost:8080/user/signup',
//         userData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       if (response.status !== 200) {
//         throw new Error('Registration failed.');
//       }
//       alert('Registration successful!');
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || 'Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <ThemeProvider theme={defaultTheme}>
//         <CssBaseline enableColorScheme />
//         <RegisterContainer direction="column" justifyContent="space-between">
//           <MuiCard variant="outlined">
//             <Typography
//               component="h1"
//               variant="h4"
//               sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
//             >
//               Register
//             </Typography>
//             <Box
//               component="form"
//               onSubmit={handleSubmit}
//               sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
//             >
//               <FormControl>
//                 <FormLabel htmlFor="name">Full name</FormLabel>
//                 <TextField
//                   autoComplete="name"
//                   name="name"
//                   required
//                   fullWidth
//                   id="name"
//                   placeholder="Thanh Danh"
//                   // error={nameError}
//                   // helperText={nameErrorMessage}
//                   // color={nameError ? 'error' : 'primary'}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel htmlFor="email">Email</FormLabel>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   placeholder="your@gmail.com"
//                   name="email"
//                   autoComplete="email"
//                   variant="outlined"
//                   // error={emailError}
//                   // helperText={emailErrorMessage}
//                   // color={emailError ? 'error' : 'primary'}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel htmlFor="password">Password</FormLabel>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   placeholder="..."
//                   id="password"
//                   autoComplete="new-password"
//                   variant="outlined"
//                   // error={passError}
//                   // helperText={passwordErrorMessage}
//                   // color={passwordError ? 'error' : 'primary'}
//                 />
//               </FormControl>
//               <FormControlLabel
//                 control={<Checkbox value="allowExtraEmails" color="primary" />}
//                 label="I want to receive updates via email."
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 // conClick={validateInputs}
//               >
//                 Register
//               </Button>
//               <Typography sx={{ textAlign: 'center' }}>
//                 Already have an account?{' '}
//                 <span>
//                   <Link
//                     href="/login"
//                     variant="body2"
//                     sx={{ alignSelf: 'center' }}
//                   >
//                     Log in
//                   </Link>
//                 </span>
//               </Typography>
//             </Box>
//             <Divider>
//               <Typography sx={{ color: 'text.secondary' }}>or</Typography>
//             </Divider>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="outlined"
//                 onClick={() => alert('Register with Google')}
//                 startIcon={<Google />}
//               >
//                 Register with Google
//               </Button>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="outlined"
//                 onClick={() => alert('Register with Facebook')}
//                 startIcon={<Facebook />}
//               >
//                 Register with Facebook
//               </Button>
//             </Box>
//           </MuiCard>
//         </RegisterContainer>
//       </ThemeProvider>
//     </>
//   );
// }

// export default Register;

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
  Alert, // Import Alert component
  LinearProgress,
} from '@mui/material';
import { Facebook, Google } from '@mui/icons-material';
import { register } from '~/services/registerService';
import Navbar from '~/components/Navbar';

const RegisterContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 4,
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
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
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
      }, 370); // Update progress every 200ms to complete in 2 seconds

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
    setSuccessMessage(''); // Clear previous success message

    try {
      const response = await register(userData);
      if (!response) {
        throw new Error('Registration failed.');
      }

      // Set the success message
      setSuccessMessage('Registration successful!');
      setErrorMessage(''); // Clear any error message
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
      <ThemeProvider theme={defaultTheme}>
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
          <MuiCard variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Register
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
                  variant="outlined"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading} // Disable button when loading
              >
                Register
              </Button>
              <Typography sx={{ textAlign: 'center' }}>
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
            <Divider>
              <Typography sx={{ color: 'text.secondary' }}>or</Typography>
            </Divider>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                onClick={() => alert('Register with Google')}
                startIcon={<Google />}
              >
                Register with Google
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                onClick={() => alert('Register with Facebook')}
                startIcon={<Facebook />}
              >
                Register with Facebook
              </Button>
            </Box>
          </MuiCard>
        </RegisterContainer>
      </ThemeProvider>
    </>
  );
}

export default Register;
