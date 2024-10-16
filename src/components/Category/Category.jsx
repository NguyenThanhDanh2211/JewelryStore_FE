import {
  Box,
  Grid,
  styled,
  Stack,
  Typography,
  Pagination,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getFilteredProducts } from '~/services/productService';
import ProductCardComponent from '../ProductCard';
import CollectionList from './CollectionList';
import { CartContext } from '~/contexts/CartContext';
import Sidebar from './Sidebar';
import Breadcrumb from '../Breadcrumb';
import HeaderCollection from './HeaderCollection';
import { AuthContext } from '~/contexts/AuthContext';

const CategoryContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  width: '100%',
  margin: '0 auto',
  padding: theme.spacing(3),
}));

function Category() {
  const { category } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const selectedCollectionFromQuery = query.get('collection');

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState(
    selectedCollectionFromQuery || null
  );
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const { addProductToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [filters, setFilters] = useState({
    tag: null,
    minPrice: null,
    maxPrice: null,
    sort: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filterParams = {
          page: currentPage,
          limit: 9,
          ...(category === 'men-jewelry' ? { men: true } : { category }),
          collect: selectedCollection,
          tag: filters.tag,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          sort: filters.sort,
        };

        const response = await getFilteredProducts(filterParams);

        setProducts(response.products);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, currentPage, selectedCollection, filters, location.search]);

  useEffect(() => {
    setSelectedCollection(selectedCollectionFromQuery || null);
  }, [selectedCollectionFromQuery]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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

  const handleTagSelect = (tag) => {
    setFilters((prevFilters) => ({ ...prevFilters, tag }));
  };

  const handlePriceRangeSelect = (priceRange) => {
    setFilters((prevFilters) => ({ ...prevFilters, priceRange }));
  };

  const handleSortSelect = (sort) => {
    setFilters((prevFilters) => ({ ...prevFilters, sort }));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <CategoryContainer>
      {!selectedCollection && location.pathname !== '/shop/men-jewelry' && (
        <>
          <Divider />

          <Box sx={{ display: 'flex', justifyContent: 'center', my: '30px' }}>
            <Typography variant="h3">
              {category === 'rings'
                ? 'Discover Our Stunning Rings Collection'
                : category === 'earrings'
                ? 'Discover Our Exquisite Earrings Collection'
                : category === 'necklaces'
                ? 'Discover Our Timeless Necklaces Collection'
                : category === 'bracelets'
                ? 'Discover Our Elegant Bracelets Collection'
                : ''}
            </Typography>
          </Box>

          <CollectionList
            category={category}
            onSelectCollection={setSelectedCollection}
          />
        </>
      )}

      {selectedCollection || location.pathname === '/shop/men-jewelry' ? (
        <HeaderCollection
          collectionType={selectedCollection || 'Men-jewelry'}
        />
      ) : null}

      <Breadcrumb />

      {/* Hiển thị các sản phẩm */}
      <Grid container spacing={2} mt={2}>
        <Grid item xs={3}>
          <Sidebar
            onTagSelect={handleTagSelect}
            onPriceRangeSelect={handlePriceRangeSelect}
            onSortSelect={handleSortSelect}
            setFilters={setFilters}
          />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <ProductCardComponent
                  product={product}
                  handleAddToCart={handleAddToCart}
                />
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
        </Grid>
      </Grid>

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
          {alertMessage}
        </Alert>
      </Snackbar>
    </CategoryContainer>
  );
}

export default Category;
