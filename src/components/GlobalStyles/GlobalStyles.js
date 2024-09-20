import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

function GlobalStyles({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default GlobalStyles;
