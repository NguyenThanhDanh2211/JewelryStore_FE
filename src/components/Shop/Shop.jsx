import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Grid,
  Typography,
  Stack,
  Snackbar,
  Alert,
  styled,
} from '@mui/material';
import Sidebar from './Sidebar';
import { getAllProduct } from '~/services/productService';
import { CartContext } from '~/contexts/CartContext';
import ProductCardComponent from '~/components/ProductCard';

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

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getAllProduct();
        setProducts(response);
        setFilteredProducts(response); // Set initial filtered products
      } catch (error) {
        console.log('Error fetching product', error);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.category.includes(selectedCategory)
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

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
        <Sidebar onCategorySelect={setSelectedCategory} />

        {/* Right Grid Section for Products */}
        <Box
          component="main"
          sx={{ flexGrow: 1 }}
          display="flex"
          flexDirection="column"
        >
          <Typography variant="nav" gutterBottom mb={1}>
            {selectedCategory}
          </Typography>
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <ProductCardComponent
                  product={product}
                  handleAddToCart={handleAddToCart}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ShopContainer>
  );
}

export default ProductPage;
