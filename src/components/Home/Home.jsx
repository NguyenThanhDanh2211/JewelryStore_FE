import { Card, Stack, Box, styled, Typography } from '@mui/material';
import Discount from './Discount';
import TabCate from './TabCate';

import icon from '~/assets/images/icon.png';
import BestSell from './BestSell';
import Banner from './Banner';

const HomeContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(1),
}));

const MuiCard = styled(Card)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  margin: 'auto',
  backgroundColor: '#f5f5f5',
}));

function Home() {
  return (
    <>
      <HomeContainer direction="column" justifyContent="space-between">
        <MuiCard variant="outlined" sx={{ border: 'none' }}>
          <Banner />

          <Box my={10}>
            <TabCate />
          </Box>

          <BestSell />

          <Stack alignItems="center" justifyContent="center" m={8} mt={15}>
            <Box
              component="img"
              src={icon}
              height="75px"
              width="75px"
              sx={{
                display: 'block',
              }}
            />
            <Box maxWidth="750px" mx={8} my={4}>
              <Typography variant="h3" textAlign="center">
                We make high-quality, handcrafted jewelry for over a decade,
                having the same passion & values!
              </Typography>
            </Box>
          </Stack>

          <Discount />
        </MuiCard>
      </HomeContainer>
    </>
  );
}

export default Home;
