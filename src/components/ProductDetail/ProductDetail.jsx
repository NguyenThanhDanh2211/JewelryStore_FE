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
  Box,
  List,
  ListItem,
  ListItemIcon,
  Link,
} from '@mui/material';

import {
  getFilteredProducts,
  getProductBySlug,
} from '~/services/productService';
import { styled } from '@mui/material/styles';
import Image from './Image';
import { CartContext } from '~/contexts/CartContext';
import { ApplePayIcon, MoMoIcon, PayPalIcon, VisaIcon } from '../Icons';
import ProductCardComponent from '../ProductCard';
import { AuthContext } from '~/contexts/AuthContext';
import Comment from './Cmt';
import StarRating from './Cmt/StarRating';

import { getComments } from '~/services/cmtService';

const ProductDetailContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: '10px 70px',
  gap: theme.spacing(2),
  margin: 'auto',
  backgroundColor: '#f5f5f5',
}));

function ProductDetail() {
  const { category, slug } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const { addProductToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  const handleUpdateQuantity = async (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      setAlertMessage('Please login before adding products to the cart.');
    } else {
      addProductToCart(product, quantity);
      setAlertMessage(`${product.name} has been added to the cart!`);
    }
    setAlertOpen(true);
  };

  const handleAddToCartOne = (product) => {
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
    const fetchComments = async () => {
      if (!product || !product._id) return;

      try {
        const commentResponse = await getComments(product._id);

        console.log(commentResponse);

        if (commentResponse && Array.isArray(commentResponse)) {
          setTotalComments(commentResponse.length);
          const totalRating = commentResponse.reduce(
            (sum, comment) => sum + comment.rating,
            0
          );
          setAverageRating(
            totalRating > 0 ? totalRating / commentResponse.length : 0
          );
        } else {
          setTotalComments(0);
          setAverageRating(0);
        }
      } catch (error) {
        console.log('Error fetch Comment', error);
        setTotalComments(0);
        setAverageRating(0);
      }
    };

    fetchComments();
  }, [product]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        if (product && product.category) {
          const response = await getFilteredProducts({
            page: 1,
            limit: 5,
            category: product.category,
          });

          const products = Array.isArray(response)
            ? response
            : response.products || [];

          const related = products.filter((item) => item.slug !== product.slug);

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
          <Alert
            onClose={handleCloseAlert}
            severity={isAuthenticated ? 'success' : 'error'}
          >
            {alertMessage}
          </Alert>
        </Snackbar>

        {product ? (
          <Grid container item xs={12} spacing={4}>
            <Grid item xs={6} mt={1}>
              <Image images={product.image} discount={product.discount} />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h1" fontSize="50px" className="product-name">
                {product.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'gray', my: 1 }}>
                {totalComments > 0 &&
                  `${averageRating.toFixed(1)} ★ (${totalComments} reviews)`}
              </Typography>

              {product.discount ? (
                <Box display="flex" flexDirection="row">
                  <Typography
                    variant="nav"
                    fontSize="25px"
                    className="product-price"
                    color="#db9662"
                    sx={{ mr: '5px' }}
                  >
                    $ {product.finalPrice.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: 'line-through', mt: '10px' }}
                  >
                    $ {product.price.toFixed(2)}
                  </Typography>
                </Box>
              ) : (
                <Typography
                  variant="nav"
                  fontSize="25px"
                  className="product-price"
                  color="#db9662"
                >
                  $ {product.price.toFixed(2)}
                </Typography>
              )}

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '0 auto',
                  textAlign: 'justify',
                }}
              >
                <Typography variant="text" className="product-des">
                  {product.description}
                </Typography>
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
                      <Typography variant="text">-</Typography>
                    </Button>
                    <Button>
                      <Typography variant="text">{quantity}</Typography>
                    </Button>

                    <Button onClick={() => handleUpdateQuantity(quantity + 1)}>
                      <Typography variant="text">+</Typography>
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    id="add-product-btn"
                    variant="single"
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                  >
                    ADD TO CART
                  </Button>
                </Grid>
              </Grid>

              <Typography variant="text" fontWeight="300">
                Category:{' '}
                <Link
                  href={`/shop/${category.toLowerCase()}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  {product.category}
                  {', '}
                </Link>
                {product.collect && (
                  <Link
                    href={`/shop/${category.toLowerCase()}?collection=${
                      product.collect
                    }`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
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
                  padding: '5px',
                  marginY: 2,
                  height: '90px',
                }}
              >
                <Typography
                  variant="nav"
                  align="center"
                  fontSize="20px"
                  sx={{
                    position: 'absolute',
                    top: '-18px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#fff',
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
      {/* <Divider /> */}
      {product && (
        <Box
          className="reviews-section"
          display="flex"
          flexDirection="column"
          width="100%"
          backgroundColor="#f5f5f5"
          sx={{
            pt: 10,
            paddingX: ' 60px',
          }}
        >
          <Box sx={{ width: '100%', ml: 1.5, my: 1 }}>
            <Typography variant="h2" fontSize="30px">
              We'd love to hear your thoughts!
            </Typography>

            {totalComments > 0 && (
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                textAlign="center"
              >
                <Typography variant="text" fontSize="72px">
                  {averageRating.toFixed(1)}
                </Typography>
                <Box ml={1}>
                  <StarRating rating={averageRating.toFixed(1)} />
                  <Typography>Average of {totalComments} reviews</Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Comment productId={product._id} name={product.name} />
        </Box>
      )}
      {/* <Divider /> */}

      <Box
        display="flex"
        flexDirection="column"
        sx={{ width: '100%', px: '70px', pb: 10, pt: 10 }}
        backgroundColor="#f5f5f5"
      >
        <Typography variant="h2" fontSize="30px" my={3}>
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
