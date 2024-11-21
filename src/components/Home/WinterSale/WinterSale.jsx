import { useContext, useState } from 'react';

import {
  Alert,
  Box,
  Grid,
  Snackbar,
  Stack,
  styled,
  Typography,
} from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ProductCardComponent from '~/components/ProductCard/ProductCard';
import { CartContext } from '~/contexts/CartContext';
import { AuthContext } from '~/contexts/AuthContext';
import img from '~/assets/images/banner-16.jpg';

const WinterSaleContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '100%',
  paddingTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px  55px',
  backgroundColor: '#f5f5f5',
}));

function WinterSale({ products }) {
  const { addProductToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      setAlertMessage('Please login before adding products to the cart.');
    } else {
      addProductToCart(product, 1);
      setAlertMessage(`${product.name} has been added to the cart!`);
    }
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  return (
    <WinterSaleContainer>
      <Typography variant="h2" fontSize="26px">
        Cozy up to amazing deals in our Winter Sale!
      </Typography>
      <Typography variant="text">
        Adorn Yourself in Glamour: Find Your Perfect Piece Today
      </Typography>

      <Box display="flex" flexDirection="row" width="100%" mt={2}>
        <Box
          sx={{
            position: 'relative',
            height: '360px',
            width: '350px',
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundPosition: 'center',
            alignItems: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            borderRadius: '5px',
          }}
        >
          <Typography variant="h3" color="#fff">
            Timeless Glamour
          </Typography>
          <Typography variant="text" fontSize="13px" color="#fff">
            Beautiful pieces to pass down for generations...
          </Typography>
        </Box>
        <Box px={1} />
        {products.length > 0 ? (
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[Navigation, Pagination, Autoplay]}
            // navigation
            // pagination
            loop
            style={{ width: '100%', height: '400px' }}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCardComponent
                  product={product}
                  handleAddToCart={handleAddToCart}
                  isLoading={false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Grid container spacing={2}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ProductCardComponent isLoading={true} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Alert Snackbar */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={isAuthenticated ? 'success' : 'error'}
          >
            <Typography variant="text">{alertMessage}</Typography>
          </Alert>
        </Snackbar>
      </Box>
    </WinterSaleContainer>
  );
}

export default WinterSale;
