import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

function Image({ images, name }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval); // Clear interval khi component bị unmount
  }, [images.length]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      setCurrentIndex(hoveredIndex);
    }
  }, [hoveredIndex]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={4}
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${name}-${index}`}
              width="75%"
              style={{
                marginBottom: '10px',
                cursor: 'pointer',
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </Grid>

      <Grid
        item
        xs={8}
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '450px',
        }}
      >
        {images && images.length > 0 ? (
          <img
            src={images[currentIndex]}
            alt={`${name}-current`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
        ) : (
          <p>No images available</p>
        )}
      </Grid>
    </Grid>
  );
}

export default Image;
