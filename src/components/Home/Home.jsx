import { Stack, Box, styled, Typography } from '@mui/material';

import icon from '~/assets/images/icon.png';
import BestSell from './BestSell';
import Banner from './Banner';
import NewCollection from './NewCollection';
import Header from '../Shop/Header';

const HomeContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
}));

function Home() {
  return (
    <>
      <HomeContainer
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Banner />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3">Explore Our Categories</Typography>
          <Typography variant="text" mt={1}>
            Exceptional designs paired with masterful craftsmanship.
          </Typography>
          <Header />
        </Box>

        <Stack alignItems="center" justifyContent="center">
          <BestSell />
        </Stack>

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

        <NewCollection />
      </HomeContainer>
    </>
  );
}

export default Home;
