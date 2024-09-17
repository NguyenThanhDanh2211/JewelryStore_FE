import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize primary color
    },
    secondary: {
      main: '#dc004e', // Customize secondary color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Set a global font family
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: '#f5f5f5', // Set a global background color
          fontSize: '16px', // Set a global font size
        },
      },
    },
  },
});

export default theme;
