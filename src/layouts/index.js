import { Stack, styled } from '@mui/material';
import Footer from '~/components/Footer';
import GoToTop from '~/components/GoToTop';
import Navbar from '~/components/Navbar';
import { AuthProvider } from '~/contexts/AuthContext';
import { CartProvider } from '~/contexts/CartContext';

const LayoutContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
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
      <CartProvider>
        <AuthProvider>
          <Navbar />
          <LayoutContainer>{children}</LayoutContainer>
          <GoToTop />
          <Footer />
        </AuthProvider>
      </CartProvider>
    </>
  );
}

export default MainLayout;
