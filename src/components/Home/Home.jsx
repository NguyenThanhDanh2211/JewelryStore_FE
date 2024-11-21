import { useEffect, useState } from 'react';
import { Stack, styled } from '@mui/material';

import BestSell from './BestSell';
import Banner from './Banner';
import NewCollection from './NewCollection';
import Video from './Video';
import WinterSale from './WinterSale';
import Men from './Men';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bestSellResponse = await getFilteredProducts({
          page: 1,
          limit: 8,
        });
        const discountResponse = await getProductDiscounted();

        const mensResponse = await getFilteredProducts({
          men: true,
          limit: 4,
        });

        setBestSellers(bestSellResponse.products || []);
        setDiscountedProducts(discountResponse || []);
        setMensProducts(mensResponse.products || []);
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
      <BestSell products={bestSellers} />
      <NewCollection />
      <WinterSale products={discountedProducts} />
      <Video />
      <Men products={mensProducts} />
    </HomeContainer>
  );
}

export default Home;
