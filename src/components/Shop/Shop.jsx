import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  styled,
  IconButton,
  Alert,
  Snackbar,
} from '@mui/material';
import Sidebar from './Sidebar';
import { getAllProduct } from '~/services/productService';
import { Link } from 'react-router-dom';
import { CartIcon } from '../Icons';
import { CartContext } from '~/contexts/CartContext';

const ShopContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  maxWidth: '1200px',
}));

const ProductCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&:hover .cart-icon': {
    opacity: 1,
  },
}));

const CartIconContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  backgroundColor: '#ffffff',
  top: '15px',
  right: '15px',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  zIndex: 1,
}));

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false); // State for alert visibility
  const [alertMessage, setAlertMessage] = useState(''); // State for alert message

  const { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getAllProduct();
        setProducts(response);
      } catch (error) {
        console.log('Error fetch product', error);
      }
    };

    fetchProduct();
  }, []);

  const handleAddToCart = (product) => {
    addProductToCart(product, 1);
    setAlertMessage(`${product.name} đã được thêm vào giỏ hàng!`);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <ShopContainer direction="column" justifyContent="space-between">
      {/* Alert Snackbar */}

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>

      <Box display="flex">
        {/* Left Drawer Section */}
        <Sidebar />

        {/* Right Grid Section for Products */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {/* {selectedCategory} */}
          </Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Link
                  to={`/product/${product.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <ProductCard>
                    <CartIconContainer
                      className="cart-icon"
                      onClick={(e) => {
                        e.preventDefault(); // Prevents navigation when clicking on the icon
                        handleAddToCart(product); // Add to cart and show alert
                      }}
                    >
                      <IconButton>
                        <CartIcon />
                      </IconButton>
                    </CartIconContainer>
                    <CardMedia
                      component="img"
                      height="300"
                      image={product.image[0]}
                      alt={product.name}
                    />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <Typography gutterBottom variant="body2">
                            {product.name}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sx={{ display: 'flex', justifyContent: 'flex-end' }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            $ {product.price}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </ProductCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ShopContainer>
  );
}

export default ProductPage;
