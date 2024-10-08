import Footer from '~/components/Footer';
import GoToTop from '~/components/GoToTop';
import Navbar from '~/components/Navbar';
import { CartProvider } from '~/contexts/CartContext';

function MainLayout({ children }) {
  return (
    <>
      <CartProvider>
        <Navbar />
        {children}
        <GoToTop />
        <Footer />
      </CartProvider>
    </>
  );
}

export default MainLayout;
