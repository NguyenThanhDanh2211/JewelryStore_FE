import { Stack, styled } from '@mui/material';

import BestSell from './BestSell';
import Banner from './Banner';
import NewCollection from './NewCollection';
import Video from './Video';

const HomeContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
}));

function Home() {
  return (
    <HomeContainer
      direction="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Banner />

      <BestSell />

      {/* <Video /> */}

      <NewCollection />
    </HomeContainer>
  );
}

export default Home;
