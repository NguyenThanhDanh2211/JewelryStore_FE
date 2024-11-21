import { useContext, useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Box,
  Link,
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
import { getFilteredProducts } from '~/services/productService';

const BestSellerContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  padding: '40px  55px',
  paddingBottom: '10px',
}));

function BestSell() {
  const [products, setProducts] = useState([]);
  const { addProductToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getFilteredProducts({ page: 1, limit: 8 });

        const products = Array.isArray(response)
          ? response
          : response.products || [];

        setProducts(products);
      } catch (error) {
        console.log('Error fetching products', error);
      }
    };

    fetchProduct();
  }, []);

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
    <>
      <BestSellerContainer>
        <Grid
          container
          sx={{
            pb: '40px',
            margin: 'auto',
          }}
        >
          {/* Left section for the title */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              sx={{
                color: '#db9662',
                letterSpacing: '1px',
                marginBottom: '16px',
              }}
            >
              BEST SELLING ITEMS
            </Typography>
            <Typography variant="h1">
              Most Popular Jewelry Accessories Items
            </Typography>
          </Grid>

          {/* Right section for description and button */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="text"
              sx={{
                textAlign: 'justify',
                color: '#6c757d',
              }}
            >
              Discover a world of exquisite beauty and craftsmanship. Each piece
              in our collection is meticulously crafted with the finest
              materials, adding a touch of luxury to your wardrobe.
            </Typography>
            <Box display="flex" justifyContent="flex-start" mt={1}>
              <Link href="/shop">
                <Button
                  variant="single"
                  size="large"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#b8764d',
                    },
                  }}
                >
                  VIEW ALL PRODUCTS
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Displaying the products */}
        {products.length > 0 ? (
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[Navigation, Pagination, Autoplay]}
            // navigation
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
          </Alert>
        </Snackbar>
      </BestSellerContainer>
    </>
  );
}

export default BestSell;
