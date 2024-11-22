import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  Typography,
  Link,
} from '@mui/material';

import SwiperProduct from './SwiperProduct';
import Banner from './Banner';
import NewCollection from './NewCollection';
import Video from './Video';
import WinterSale from './WinterSale';
import Men from './Men';
import Blog from './Blog';

import {
  getProductDiscounted,
  getFilteredProducts,
} from '~/services/productService';

const HomeContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
}));

function Home() {
  const [bestSellers, setBestSellers] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [mensProducts, setMensProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bestSellResponse = await getFilteredProducts({
          page: 1,
          limit: 10,
        });

        const discountResponse = await getProductDiscounted();

        const mensResponse = await getFilteredProducts({
          men: true,
          limit: 4,
        });

        const newResponse = await getFilteredProducts({
          page: 10,
          limit: 10,
        });

        setBestSellers(bestSellResponse.products || []);
        setDiscountedProducts(discountResponse || []);
        setMensProducts(mensResponse.products || []);

        setNewProducts(newResponse.products || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <HomeContainer
      direction="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Banner />

      <Box backgroundColor="#f5f5f5" pt="40px" px="55px">
        <Grid
          container
          sx={{
            pb: '40px',
            margin: 'auto',
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              sx={{
                color: '#db9662',
                letterSpacing: '1px',
                marginBottom: '16px',
              }}
            >
              BEST SELLING ITEMS
            </Typography>
            <Typography variant="h1">
              Most Popular Jewelry Accessories Items
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              variant="text"
              sx={{
                textAlign: 'justify',
                color: '#6c757d',
              }}
            >
              Discover a world of exquisite beauty and craftsmanship. Each piece
              in our collection is meticulously crafted with the finest
              materials, adding a touch of luxury to your wardrobe.
            </Typography>
            <Box display="flex" justifyContent="flex-start" mt={1}>
              <Link href="/shop">
                <Button
                  variant="single"
                  size="large"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#b8764d',
                    },
                  }}
                >
                  VIEW ALL PRODUCTS
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <SwiperProduct products={bestSellers} slidesPerView={5} />

      <NewCollection />
      <WinterSale products={discountedProducts} />
      <Video />

      <Box backgroundColor="#f5f5f5" py="20px" pt="50px" px="55px" width="100%">
        <Typography
          variant="h2"
          sx={{
            color: '#db9662',
            letterSpacing: '1px',
          }}
        >
          NEW ARRIVALS
        </Typography>
        <Typography
          variant="text"
          sx={{
            textAlign: 'justify',
            color: '#8a9199',
          }}
        >
          Discover the latest designs crafted to perfection, just for you.
        </Typography>
      </Box>
      <SwiperProduct products={newProducts} slidesPerView={5} />

      <Men products={mensProducts} />
      <Blog />
    </HomeContainer>
  );
}

export default Home;
