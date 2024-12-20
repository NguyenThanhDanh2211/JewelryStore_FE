import { Stack, Box, styled, Typography } from '@mui/material';

import data from '~/data/homeData';

const { images } = data;

const CollectionContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#f5f5f5',
}));

function ImageBox({ src, href, content, label, size, isWide }) {
  const isWhiteText = src === images[0].src;

  return (
    <Box
      component="a"
      href={href}
      sx={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: `${size}px`,
        width: isWide ? '100%' : `${size * 1.35}px`,
        m: 1,
        textDecoration: 'none',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '20px',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          color: isWhiteText ? '#fff' : '#000',
          fontSize: isWhiteText ? '2.5rem' : '1.2rem',
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="text"
        sx={{
          color: isWhiteText ? '#fff' : '#000',
          fontSize: isWhiteText ? '1.9rem' : '1rem',
          mt: 1,
        }}
      >
        {content}
      </Typography>
      <Typography
        sx={{
          fontWeight: 'bold',
          color: isWhiteText ? '#fff' : '#000',
          mt: 1,
          textDecoration: 'underline',
          textUnderlineOffset: 5,
          textDecorationThickness: 2,
        }}
      >
        SHOP NOW
      </Typography>
    </Box>
  );
}

function NewCollection() {
  return (
    <CollectionContainer>
      <ImageBox {...images[0]} />
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row">
          <ImageBox {...images[1]} isWide />
        </Box>
        <Box display="flex" flexDirection="row">
          <ImageBox {...images[2]} />
          <ImageBox {...images[3]} />
        </Box>
      </Box>
    </CollectionContainer>
  );
}

export default NewCollection;
