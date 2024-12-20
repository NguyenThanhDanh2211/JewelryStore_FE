import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Grid,
  Stack,
  Snackbar,
  Alert,
  Pagination,
  styled,
  Typography,
} from '@mui/material';
import { getFilteredProducts } from '~/services/productService';
import { CartContext } from '~/contexts/CartContext';
import ProductCardComponent from '~/components/ProductCard';
import Header from './Header';
import { AuthContext } from '~/contexts/AuthContext';

const ShopContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: '50px 70px 70px',
  gap: theme.spacing(2),
  margin: 'auto',
  backgroundColor: '#f5f5f5',
}));

function Shop() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const { addProductToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const filters = {
          page: currentPage,
          limit: 15,
          category: null,
        };

        const response = await getFilteredProducts(filters);
        setProducts(response.products);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.log('Error fetching products', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <ShopContainer direction="column" justifyContent="space-between">
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

      <Header />

      <Box display="flex" mt={5}>
        <Box
          component="main"
          sx={{ flexGrow: 1 }}
          display="flex"
          flexDirection="column"
        >
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid
                className="product-item-card"
                item
                xs={12}
                sm={6}
                md={2.4}
                key={product._id}
              >
                <ProductCardComponent
                  product={product}
                  handleAddToCart={handleAddToCart}
                />
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
        </Box>
      </Box>
    </ShopContainer>
  );
}

export default Shop;
