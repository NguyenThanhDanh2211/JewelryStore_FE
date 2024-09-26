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
    text: {
      fontFamily: 'Poppins, sans-serif', // Font mặc định cho nội dung
      fontWeight: 200,
      fontSize: 16,
      color: '#555555',
    },
    h1: {
      fontFamily: 'Italiana, sans-serif',
      fontWeight: 300,
      fontSize: 80,
      color: 'rgb(29, 21, 10)',
    },
    h2: {
      fontFamily: 'Italiana, sans-serif',
      fontWeight: 300,
      fontSize: 25,
      color: 'rgb(29, 21, 10)',
    },
    body1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: 30,
      color: 'rgb(154, 154, 154)',
    },
    body2: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: 15,
      color: 'rgb(154, 154, 154)',
    },

    nav: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: 20,
      color: 'rgb(154, 154, 154)',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#555555',
          border: '1px solid rgb(154, 154, 154)',
          height: '40px',
          '&:hover': {
            backgroundColor: '#e0e0e0',
            borderColor: '#888888',
          },

          variants: [
            {
              props: {
                variant: 'single',
              },
              style: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: 15,
                color: '#555555',
                borderRadius: '0px',
                border: '1px solid rgb(154, 154, 154)',
                '&:hover': {
                  backgroundColor: '#555555',
                  color: '#ffffff',
                },
              },
            },
          ],
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {},
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#555555',
          fontSize: '15px',
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            borderRadius: '0px',
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          minHeight: '30px',
        },
        input: {
          padding: '8px 10px',
          lineHeight: 1.2,
        },
      },
    },

    MuiFormControlLabel: {
      styleOverrides: {
        root: {},
        label: {
          color: '#555555',
          fontSize: '15px',
        },
        control: {
          color: '#1976d2',
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: '#f5f5f5',
          fontSize: '16px',
        },
      },
    },
  },
});

export default theme;
