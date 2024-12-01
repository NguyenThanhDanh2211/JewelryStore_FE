import { useContext, useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Alert,
  Snackbar,
  styled,
  Stack,
} from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ProductCardComponent from '~/components/ProductCard/ProductCard';
import { CartContext } from '~/contexts/CartContext';
import { AuthContext } from '~/contexts/AuthContext';

const SwiperProductContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  padding: '0px  55px',
  paddingBottom: '10px',
}));

function SwiperProduct({ products, slidesPerView }) {
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
    <SwiperProductContainer>
      {/* Displaying the products */}
      {products.length > 0 ? (
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={20}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Navigation, Pagination, Autoplay]}
          loop
          style={{ width: '100%', height: '400px' }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <Box px={0}>
                <ProductCardComponent
                  product={product}
                  handleAddToCart={handleAddToCart}
                  isLoading={false}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Grid container spacing={2}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
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
          {isAuthenticated && (
            <Typography
              display="flex"
              flexDirection="column"
              component="a"
              href="/cart"
            >
              VIEW CART
            </Typography>
          )}
        </Alert>
      </Snackbar>
    </SwiperProductContainer>
  );
}

export default SwiperProduct;
