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
      fontFamily: 'Jost, sans-serif',
      fontWeight: 200,
      fontSize: 16,
      color: '#555555',
    },

    nav: {
      fontFamily: 'Jost, sans-serif',
      fontWeight: 600,
      fontSize: 14,
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
                fontFamily: 'Jost, sans-serif',
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
          // backgroundColor: '#f5f5f5',
          backgroundColor: '#ffffff',
          fontSize: '16px',
        },
      },
    },

    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            color: '#db9662',
          },
          '& .Mui-selected': {
            backgroundColor: '#db9662 !important',
            color: '#fff',
          },
          '& .MuiPaginationItem-root:hover': {
            backgroundColor: '#f4a87c',
            color: '#fff',
          },
        },
      },
    },
  },
});

export default theme;
