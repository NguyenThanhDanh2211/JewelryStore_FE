import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import {
  Button,
  ButtonGroup,
  Grid,
  Stack,
  Snackbar,
  Alert,
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';

import { getProductBySlug } from '~/services/productService';
import { styled } from '@mui/material/styles';
import Image from './Image';
import { CartContext } from '~/contexts/CartContext';
import { ApplePayIcon, MoMoIcon, PayPalIcon, VisaIcon } from '../Icons';

const ProductDetailContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(8),
  gap: theme.spacing(2),
  margin: 'auto',
}));

function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const { addProductToCart } = useContext(CartContext);

  const handleUpdateQuantity = async (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = (product) => {
    addProductToCart(product, quantity);
    setAlertMessage(`${product.name} đã được thêm vào giỏ hàng!`);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductBySlug(slug);
        setProduct(response);
      } catch (error) {
        console.log('Error fetch Product', error);
      }
    };

    fetchProduct();
  }, [slug]);

  return (
    <>
      <ProductDetailContainer direction="column" justifyContent="space-between">
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

        {product ? (
          <Grid container item xs={12} spacing={10}>
            <Grid item xs={6}>
              <Image images={product.image} name={product.name} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h3">{product.name}</Typography>
              <Typography variant="body1" sx={{ my: '15px' }}>
                $ {product.price}
              </Typography>
              <Box
                sx={{
                  margin: '0 auto',
                  textAlign: 'justify',
                }}
              >
                <Typography variant="text">{product.description}</Typography>
              </Box>
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  my: '15px',
                }}
              >
                <Grid item xs={3}>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="Basic button group"
                  >
                    <Button onClick={() => handleUpdateQuantity(quantity - 1)}>
                      <Typography variant="body2">-</Typography>
                    </Button>
                    <Button>
                      <Typography variant="body2">{quantity}</Typography>
                    </Button>

                    <Button onClick={() => handleUpdateQuantity(quantity + 1)}>
                      <Typography variant="body2">+</Typography>
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="single"
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                  >
                    ADD TO CART
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ width: '100%', my: 2 }}>
                <Divider />
              </Box>
              <Typography variant="text">
                Category: {product.category}
              </Typography>

              {/* Payment */}

              <Box
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  position: 'relative',
                  padding: '10px',
                  marginY: 2,
                  height: '90px',
                }}
              >
                <Typography
                  variant="nav"
                  align="center"
                  sx={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#f5f5f5',
                    paddingX: 1,
                  }}
                >
                  Guaranteed Safe Checkout
                </Typography>

                <Grid container>
                  <Grid item xs={12}>
                    <List
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0,
                      }}
                    >
                      <ListItem sx={{ width: 'auto' }}>
                        <ListItemIcon>
                          <VisaIcon />
                        </ListItemIcon>
                      </ListItem>

                      <ListItem sx={{ width: 'auto' }}>
                        <ListItemIcon>
                          <PayPalIcon />
                        </ListItemIcon>
                      </ListItem>

                      <ListItem sx={{ width: 'auto' }}>
                        <ListItemIcon>
                          <ApplePayIcon />
                        </ListItemIcon>
                      </ListItem>

                      <ListItem sx={{ width: 'auto' }}>
                        <ListItemIcon>
                          <MoMoIcon width="2.6rem" height="2.6rem" />
                        </ListItemIcon>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <p>Loading product details...</p>
        )}
      </ProductDetailContainer>
    </>
  );
}

export default ProductDetail;
