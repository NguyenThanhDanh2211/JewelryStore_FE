import { Box, Grid, Stack, styled, Typography } from '@mui/material';

import img1 from '~/assets/images/men1.jpeg';
import img2 from '~/assets/images/men2.webp';
import ProductCardComponent from '~/components/ProductCard';

const MenContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f5f5f5',
  padding: '40px 55px',
}));

function Men({ products }) {
  // Chia sản phẩm thành 2 nhóm
  const half = Math.ceil(products.length / 2);
  const firstHalf = products.slice(0, half);
  const secondHalf = products.slice(half);

  // Render từng nhóm sản phẩm
  const renderProducts = (productList) => {
    return productList.length > 0 ? (
      productList.map((product, index) => (
        <Grid item xs={12} sm={6} md={6} key={product._id || index}>
          <Box ml={2}>
            <ProductCardComponent product={product} isLoading={false} />
          </Box>
        </Grid>
      ))
    ) : (
      <Grid container spacing={2}>
        {Array.from({ length: 2 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Box ml={2}>
              <ProductCardComponent isLoading={true} />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <MenContainer>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Typography variant="h3">
            The intricate designs which you will not find anywhere else
          </Typography>
          <Typography variant="text">
            Explore unique and timeless pieces crafted with exceptional
            artistry.
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box component="img" src={img1} width="450px" ml={2} />
        </Grid>
        <Grid xs={1}></Grid>
        <Grid item xs={5} display="flex">
          {renderProducts(firstHalf)}
        </Grid>
      </Grid>

      <Grid container alignItems="center">
        <Grid item ml={-2} xs={5} display="flex" justifyContent="flex-start">
          {renderProducts(secondHalf)}
        </Grid>

        <Grid item xs={3}>
          <Box component="img" src={img2} width="450px" ml={2} />
        </Grid>
        <Grid xs={1}></Grid>

        <Grid item xs={3} ml={2}>
          <Typography variant="h3">
            High class craftsmanship which you have always deserved
          </Typography>
          <Typography variant="text">
            Discover exquisite jewelry designed with exceptional attention to
            detail, perfect for those who appreciate the finest things in life.
          </Typography>
        </Grid>
      </Grid>
    </MenContainer>
  );
}

export default Men;
