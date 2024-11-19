import React from 'react';
import { Box, Card, CardContent, Typography, styled } from '@mui/material';
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
  color: 'red',
  border: '2px red solid',
  top: '15px',
  left: '15px',
  zIndex: 2,
  width: '45px',
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

function ProductCardComponent({ product, handleAddToCart }) {
  const { slug, category, discount } = product;

  return (
    <Link
      to={`/shop/${category.toLowerCase()}/${slug}`}
      style={{ textDecoration: 'none' }}
    >
      <ProductCard sx={{ height: 355 }}>
        {discount && (
          <DiscountContainer>
            <Typography variant="nav">{product.discount}%</Typography>
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
          <Typography variant="h3">ADD TO CART</Typography>
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
                color="#f4a87c"
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
            <Typography variant="nav" fontSize="18px">
              $ {product.price.toFixed(2)}
            </Typography>
          )}
        </CardContent>
      </ProductCard>
    </Link>
  );
}

export default ProductCardComponent;
