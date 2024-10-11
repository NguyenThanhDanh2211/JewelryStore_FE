import {
  Grid,
  Typography,
  Button,
  Box,
  Link,
  Alert,
  Snackbar,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import ProductCardComponent from '~/components/ProductCard/ProductCard';
import { CartContext } from '~/contexts/CartContext';
import { getAllProduct } from '~/services/productService';

function BestSell() {
  const [products, setProducts] = useState([]);
  const { addProductToCart } = useContext(CartContext);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getAllProduct();
        setProducts(response);
      } catch (error) {
        console.log('Error fetching products', error);
      }
    };

    fetchProduct();
  }, []);

  const handleAddToCart = (product) => {
    addProductToCart(product, 1);
    setAlertMessage(`${product.name} has been added to the cart!`);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Box alignItems="center" mb={7}>
      <Grid
        container
        sx={{
          backgroundColor: '#f5f5f5',
          padding: '20px 0',
          margin: 'auto',
        }}
      >
        {/* Left section for the title */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            sx={{
              color: '#db9662',
              letterSpacing: '1px',
              marginBottom: '16px',
            }}
          >
            BEST SELLING ITEMS
          </Typography>
          <Typography variant="h4">
            Most Popular Jewelry Accessories Items
          </Typography>
        </Grid>

        {/* Right section for description and button */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="body2"
            sx={{
              marginBottom: '1.5rem',
              textAlign: 'justify',
              color: '#6c757d',
            }}
          >
            Discover a world of exquisite beauty and craftsmanship. Each piece
            in our collection is meticulously crafted with the finest materials,
            adding a touch of luxury to your wardrobe.
          </Typography>
          <Box display="flex" justifyContent="flex-start">
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
      <Grid container spacing={4}>
        {products.slice(0, 4).map((product) => (
          <Grid item xs={12} sm={5} md={3} key={product._id}>
            <ProductCardComponent
              product={product}
              handleAddToCart={handleAddToCart}
            />
          </Grid>
        ))}
      </Grid>

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
    </Box>
  );
}

export default BestSell;
