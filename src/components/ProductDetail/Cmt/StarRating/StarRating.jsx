import React from 'react';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const StarRating = ({ rating }) => {
  const totalStars = 5;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {Array.from({ length: totalStars }, (_, index) => (
        <span key={index}>
          {index < rating ? (
            <StarIcon style={{ color: '#FFD700' }} />
          ) : (
            <StarBorderIcon style={{ color: '#FFD700' }} />
          )}
        </span>
      ))}
    </Box>
  );
};

export default StarRating;
