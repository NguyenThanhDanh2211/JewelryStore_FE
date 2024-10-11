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
  const selectedCollectionFromQuery = query.get('collect');

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

  const [filters, setFilters] = useState({
    tag: null,
    minPrice: null,
    maxPrice: null,
    sort: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
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
  }, [category, currentPage, selectedCollection, filters]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product) => {
    addProductToCart(product, 1);
    setAlertMessage(`${product.name} đã được thêm vào giỏ hàng!`);
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
    return <p>Loading...</p>;
  }

  const capitalizeWords = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  };
  return (
    <CategoryContainer>
      {!selectedCollection && location.pathname !== '/shop/men-jewelry' && (
        <>
          <Divider />

          <Box sx={{ display: 'flex', justifyContent: 'center', my: '30px' }}>
            <Typography variant="h3">{capitalizeWords(category)}</Typography>
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
        <Alert onClose={handleCloseAlert} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </CategoryContainer>
  );
}

export default Category;
