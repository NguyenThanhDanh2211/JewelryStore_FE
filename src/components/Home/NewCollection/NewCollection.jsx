import { Stack, Box, styled, Typography } from '@mui/material';
import img1 from '~/assets/images/story.jpg';
import img2 from '~/assets/images/banner-10.jpg';
import img3 from '~/assets/images/banner-13.jpg';
import img4 from '~/assets/images/banner-12.jpg';

const CollectionContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#f5f5f5',
}));

const images = [
  {
    src: img1,
    href: '/shop/men-jewelry',
    content: 'Bold designs for modern men.',
    label: "MEN'S JEWELRY",
    size: 516,
  },
  {
    src: img2,
    href: '/shop/necklaces?collection=Layering',
    content: 'Perfect for layered looks.',
    label: 'LAYERING NECKLACES',
    size: 250,
  },
  {
    src: img3,
    href: '/shop/rings?collection=Wedding',
    content: 'Rings for your big day.',
    label: ' WEDDING RINGS',
    size: 250,
  },
  {
    src: img4,
    href: '/shop/earrings?collection=Drop%20and%20Dangle',
    content: 'Elegant drop earrings.',
    label: ' DROP AND DANGLE EARINGS',
    size: 250,
  },
];

function ImageBox({ src, href, content, label, size, isWide }) {
  const isWhiteText = src === img1;

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
