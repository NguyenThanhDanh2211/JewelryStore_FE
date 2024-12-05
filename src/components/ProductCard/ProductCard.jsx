import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Skeleton,
  styled,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  height: '360px',
  width: '100%',
  minWidth: '260px',
  flexDirection: 'column',
  '&:hover .cart-icon': {
    opacity: 1,
  },
}));

const CartIconContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  bottom: '105px',
  width: '100%',
  padding: '8px 0',
  display: 'flex',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease, background-color 0.3s ease',
  zIndex: 1,

  // Hiện khi hover vào ProductCard
  [`${ProductCard}:hover &`]: {
    opacity: 1,
  },

  // Luôn hiển thị nếu loading
  '&.loading': {
    opacity: 1,
  },
}));

const DiscountContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '8%',
  color: '#DC586D',
  border: '2px #DC586D solid',
  top: '15px',
  left: '15px',
  zIndex: 2,
  width: '70px',
  display: 'flex',
  justifyContent: 'center',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'background-image 0.3s ease',
}));

function ProductCardComponent({ product, handleAddToCart, isLoading }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCartWithLoading = (product) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      handleAddToCart(product);
    }, 2000);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          height: '360px',
          width: '100%',
          minWidth: '260px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          overflow: 'hidden',
          padding: '16px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Skeleton variant="rectangular" width="100%" height="200px" />
        <Skeleton variant="text" sx={{ mt: 2, width: '80%' }} />
        <Skeleton variant="text" sx={{ width: '60%' }} />
        <Skeleton
          variant="rectangular"
          sx={{ mt: 2, width: '100%', height: '40px' }}
        />
      </Box>
    );
  }

  const { slug, category, discount } = product;

  return (
    <Link
      to={`/shop/${category.toLowerCase()}/${slug}`}
      style={{ textDecoration: 'none' }}
    >
      <ProductCard>
        {discount > 0 && (
          <DiscountContainer>
            <Typography variant="nav">{product.discount}% OFF</Typography>
          </DiscountContainer>
        )}

        <ImageContainer
          sx={{
            backgroundImage: `url(${product.image[0]})`,
            '&:hover': {
              backgroundImage: `url(${product.image[1]})`,
            },
          }}
        />

        <CartIconContainer
          className={`cart-icon ${loading ? 'loading' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            if (!loading) handleAddToCartWithLoading(product);
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: '#db9662' }} />
          ) : (
            <Typography variant="h3" color="#db9662">
              ADD TO CART
            </Typography>
          )}
        </CartIconContainer>

        <Box
          height="150px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          ml={2}
        >
          <Typography
            variant="nav"
            sx={{ marginBottom: '5px' }}
            color="#aeb5bd"
          >
            {product.category}
          </Typography>
          <Typography gutterBottom variant="h3" sx={{ marginBottom: '5px' }}>
            {product.name}
          </Typography>

          {discount ? (
            <Box display="flex" flexDirection="row">
              <Typography
                variant="nav"
                color="#db9662"
                sx={{ marginRight: '8px', fontSize: '18px' }}
              >
                $ {product.finalPrice.toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                sx={{ textDecoration: 'line-through', mt: '3px' }}
              >
                $ {product.price.toFixed(2)}
              </Typography>
            </Box>
          ) : (
            <Typography variant="nav" fontSize="18px" color="#db9662">
              $ {product.price.toFixed(2)}
            </Typography>
          )}
        </Box>
      </ProductCard>
    </Link>
  );
}

export default ProductCardComponent;
