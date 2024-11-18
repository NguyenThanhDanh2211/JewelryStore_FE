import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import bn1 from '~/assets/images/bn1.jpg';
import bn2 from '~/assets/images/bn2.jpg';
import bn3 from '~/assets/images/bn3.jpg';
import bn4 from '~/assets/images/bn4.webp';
import bn5 from '~/assets/images/bn5.png';
import bn6 from '~/assets/images/bn6.png';

const images = [bn1, bn4, bn2, bn5, bn3, bn6];
const captions = [
  'Discover timeless elegance.',
  'Crafted to perfection.',
  'Your next masterpiece awaits.',
  'The art of fine jewelry.',
  'Unmatched beauty, unmatched quality.',
  'Experience brilliance like never before.',
];

function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCaption, setShowCaption] = useState(true);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    const captionTimeout = setTimeout(() => {
      setShowCaption(true);
    }, 2000);

    const hideCaptionTimeout = setTimeout(() => {
      setShowCaption(false);
    }, 6000);

    return () => {
      clearInterval(imageInterval);
      clearTimeout(captionTimeout);
      clearTimeout(hideCaptionTimeout);
    };
  }, [currentIndex]);

  return (
    <Box
      sx={{
        // width: '100%',
        height: '600px',
        position: 'relative',
        overflow: 'hidden',
        mb: '70px',
      }}
    >
      {images.map((img, index) => (
        <Box
          key={index}
          component="img"
          src={img}
          alt={`banner-${index}`}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '600px',
            objectFit: 'cover',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 2s ease',
            transform: index === currentIndex ? 'scale(1.1)' : 'scale(1)',
            transitionProperty: 'opacity, transform',
            transitionDuration: '8s, 8s',
          }}
        />
      ))}
      {showCaption && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            opacity: showCaption ? 1 : 0,
            transition: 'opacity 1s ease, top 1s ease',
          }}
        >
          <Typography variant="h1" align="center" color="#fff">
            {captions[currentIndex]}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Banner;
