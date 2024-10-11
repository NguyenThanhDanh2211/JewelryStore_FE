import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { CartIcon } from '../Icons';

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

function ProductCardComponent({ product, handleAddToCart }) {
  const { slug, category } = product;

  return (
    <Link to={`/shop/${category}/${slug}`} style={{ textDecoration: 'none' }}>
      <ProductCard sx={{ height: 355 }}>
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
        <Box
          sx={{
            height: 300,
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image={product.image[0]}
            alt={product.name}
            sx={{
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        </Box>
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
                $ {product.price.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </ProductCard>
    </Link>
  );
}

export default ProductCardComponent;
