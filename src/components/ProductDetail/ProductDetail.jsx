import { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';

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
  Link,
} from '@mui/material';

import { getAllProduct, getProductBySlug } from '~/services/productService';
import { styled } from '@mui/material/styles';
import Image from './Image';
import { CartContext } from '~/contexts/CartContext';
import { ApplePayIcon, MoMoIcon, PayPalIcon, VisaIcon } from '../Icons';
import ProductCardComponent from '../ProductCard';

const ProductDetailContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2),
  paddingTop: '30px',
  gap: theme.spacing(2),
  margin: 'auto',
}));

function ProductDetail() {
  const { category, slug } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { addProductToCart } = useContext(CartContext);

  const handleUpdateQuantity = async (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = (product) => {
    addProductToCart(product, quantity);
    setAlertMessage(`${product.name} has been added to the cart!`);
    setAlertOpen(true);
  };

  const handleAddToCartOne = (product) => {
    addProductToCart(product, 1);
    setAlertMessage(`${product.name} has been added to the cart!`);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductBySlug(category, slug);
        setProduct(response);
      } catch (error) {
        console.log('Error fetch Product', error);
      }
    };

    fetchProduct();
  }, [category, slug]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        if (product && product.category) {
          const response = await getAllProduct();
          const related = response.filter(
            (item) =>
              item.category === product.category && item.slug !== product.slug
          );

          setRelatedProducts(related);
        }
      } catch (error) {
        console.log('Error fetching products', error);
      }
    };
    fetchRelated();
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const ProductDetails = ({ details }) => {
    const detailsArray = details.split('/');

    return (
      <Box mt={2}>
        {detailsArray.map((detail, index) => (
          <Typography key={index} variant="text" component="div">
            - {detail.trim()}
          </Typography>
        ))}
      </Box>
    );
  };

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
          <Grid container item xs={12} spacing={4}>
            <Grid item xs={6} mt={1}>
              <Image images={product.image} name={product.name} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h3">{product.name}</Typography>
              <Typography variant="body1" sx={{ my: '15px' }}>
                $ {product.price.toFixed(2)}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '0 auto',
                  textAlign: 'justify',
                }}
              >
                <Typography variant="text">{product.description}</Typography>
                {product.detail && <ProductDetails details={product.detail} />}
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
                Category:{' '}
                <Link
                  href={`/shop/${category.toLowerCase()}`}
                  style={{ textDecoration: 'none' }}
                >
                  {product.category}
                  {', '}
                </Link>
                {product.collect && (
                  <Link
                    href={`/shop/${category.toLowerCase()}?collection=${
                      product.collect
                    }`}
                    style={{ textDecoration: 'none' }}
                  >
                    {product.collect}
                    {', '}
                  </Link>
                )}
                {product.productId}.
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
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        ) : (
          <p>Loading product details...</p>
        )}
      </ProductDetailContainer>

      <Box
        display="flex"
        flexDirection="column"
        sx={{
          // maxWidth: '1200px',
          margin: 'auto',
          pb: '40px',
        }}
      >
        <Typography>CMT</Typography>
        <Divider />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        sx={{ width: '100%', margin: 'auto', p: '30px' }}
      >
        <Typography variant="h3" my={3}>
          Related Products
        </Typography>

        {product && relatedProducts.length > 0 && (
          <Grid container spacing={2}>
            {relatedProducts.slice(0, 4).map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={item._id}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <ProductCardComponent
                  product={item}
                  handleAddToCart={handleAddToCartOne}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}

export default ProductDetail;
