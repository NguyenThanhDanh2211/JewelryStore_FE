import {
  Alert,
  Box,
  Grid,
  Snackbar,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';

import img1 from '~/assets/images/men1.jpeg';
import img2 from '~/assets/images/men2.webp';
import ProductCardComponent from '~/components/ProductCard';
import { AuthContext } from '~/contexts/AuthContext';
import { CartContext } from '~/contexts/CartContext';

const MenContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f5f5f5',
  padding: '40px 55px',
  paddingTop: '30px',
}));

function Men({ products }) {
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

  const half = Math.ceil(products.length / 2);
  const firstHalf = products.slice(0, half);
  const secondHalf = products.slice(half);

  const renderProducts = (productList) => {
    return productList.length > 0 ? (
      productList.map((product, index) => (
        <Grid item xs={12} sm={6} md={6} key={product._id || index}>
          <Box ml={2}>
            <ProductCardComponent
              product={product}
              handleAddToCart={handleAddToCart}
              isLoading={false}
            />
          </Box>
        </Grid>
      ))
    ) : (
      <Grid container spacing={2}>
        {Array.from({ length: 2 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Box ml={2}>
              <ProductCardComponent isLoading={true} />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <MenContainer>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={3}>
          <Typography variant="h3">
            The intricate designs which you will not find anywhere else
          </Typography>
          <Typography
            variant="text"
            sx={{
              textAlign: 'justify',
              color: '#8a9199',
            }}
          >
            Explore unique and timeless pieces crafted with exceptional
            artistry.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box component="img" src={img1} width="450px" ml={2} />
        </Grid>
        <Grid item xs={12} sm={1}></Grid>
        <Grid item xs={12} sm={5} display="flex">
          {renderProducts(firstHalf)}
        </Grid>
      </Grid>

      <Grid container alignItems="center">
        <Grid
          item
          xs={12}
          sm={5}
          ml={-2}
          display="flex"
          justifyContent="flex-start"
        >
          {renderProducts(secondHalf)}
        </Grid>

        <Grid item xs={12} sm={3}>
          <Box component="img" src={img2} width="450px" ml={2} />
        </Grid>
        <Grid item xs={12} sm={1}></Grid>

        <Grid item xs={12} sm={3} ml={2}>
          <Typography variant="h3">
            High class craftsmanship which you have always deserved
          </Typography>
          <Typography
            variant="text"
            sx={{
              textAlign: 'justify',
              color: '#8a9199',
            }}
          >
            Discover exquisite jewelry designed with exceptional attention to
            detail, perfect for those who appreciate the finest things in life.
          </Typography>
        </Grid>
      </Grid>

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
    </MenContainer>
  );
}

export default Men;
