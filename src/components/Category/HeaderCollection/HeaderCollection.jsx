import { Grid, Typography, Box } from '@mui/material';

import collect from '~/data/categoryData';
const { collections } = collect;

function HeaderCollection({ collectionType }) {
  const data = collections[collectionType];

  if (!data) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        height: '350px',
        width: '100%',
        backgroundImage: `url(${data.image})`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Grid item container xs={5} ml={10}>
        <Typography variant="h1" fontSize="40px">
          {data.title}
        </Typography>
        <Box sx={{ textAlign: 'justify' }}>
          <Typography variant="text" fontSize="20px">
            {data.description}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
}

export default HeaderCollection;
