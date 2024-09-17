// import './GlobalStyles.css';

// function GlobalStyles({ children }) {
//   return children;
// }

// export default GlobalStyles;

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme'; // Import your custom theme

function GlobalStyles({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply global reset and styles */}
      {children}
    </ThemeProvider>
  );
}

export default GlobalStyles;
