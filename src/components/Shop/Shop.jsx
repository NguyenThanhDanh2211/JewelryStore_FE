import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Grid,
  Typography,
  Stack,
  Snackbar,
  Alert,
  Pagination,
  styled,
} from '@mui/material';
import Sidebar from './Sidebar';
import { getFilteredProducts } from '~/services/productService';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const filters = {
          page: currentPage,
          limit: 9, // Adjust limit based on your pagination settings
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          tag: selectedTag,
          minPrice: selectedPriceRange ? selectedPriceRange[0] : undefined,
          maxPrice: selectedPriceRange ? selectedPriceRange[1] : undefined,
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
  }, [currentPage, selectedCategory, selectedTag, selectedPriceRange]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // 'value' represents the page number
  };

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
        <Sidebar
          onCategorySelect={setSelectedCategory}
          onTagSelect={setSelectedTag}
          onPriceRangeSelect={setSelectedPriceRange}
        />

        {/* Right Grid Section for Products */}
        <Box
          component="main"
          sx={{ flexGrow: 1 }}
          display="flex"
          flexDirection="column"
        >
          <Typography variant="nav" gutterBottom mb={1}>
            {selectedCategory} {selectedTag} {selectedPriceRange}
          </Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
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

export default ProductPage;
