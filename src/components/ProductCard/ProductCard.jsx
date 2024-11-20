import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Skeleton,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 480,
  '&:hover .cart-icon': {
    opacity: 1,
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const CartIconContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  // border: '1px #ccc solid',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  bottom: '132px',
  width: '100%',
  padding: '8px 0',
  display: 'flex',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease, background-color 0.3s ease',
  zIndex: 1,
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
  height: '350px',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'background-image 0.3s ease',
}));

function ProductCardComponent({ product, handleAddToCart, isLoading }) {
  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '350px',
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
      <ProductCard sx={{ height: 355 }}>
        {discount && (
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
          className="cart-icon"
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart(product);
          }}
        >
          <Typography variant="h3" color="#db9662">
            ADD TO CART
          </Typography>
        </CartIconContainer>

        <CardContent>
          <Typography
            variant="nav"
            sx={{ marginBottom: '8px' }}
            color="#aeb5bd"
          >
            {product.category}
          </Typography>
          <Typography gutterBottom variant="h2" sx={{ marginBottom: '8px' }}>
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
        </CardContent>
      </ProductCard>
    </Link>
  );
}

export default ProductCardComponent;
