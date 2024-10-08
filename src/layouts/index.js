import { Stack, styled } from '@mui/material';
import Footer from '~/components/Footer';
import GoToTop from '~/components/GoToTop';
import Navbar from '~/components/Navbar';
// import { AuthProvider } from '~/contexts/AuthContext';
import { CartProvider } from '~/contexts/CartContext';

const LayoutContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  maxWidth: '90%',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  // padding: theme.spacing(3),
}));

function MainLayout({ children }) {
  return (
    <>
      {/* <AuthProvider> */}
      <CartProvider>
        {/* <Navbar /> */}
        <LayoutContainer>{children}</LayoutContainer>
        <GoToTop />
        <Footer />
      </CartProvider>
      {/* </AuthProvider> */}
    </>
  );
}

export default MainLayout;
