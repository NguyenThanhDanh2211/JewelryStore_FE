import React from 'react';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const StarRating = ({ rating }) => {
  const totalStars = 5;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;

        return (
          <span key={index}>
            {rating >= starValue ? (
              <StarIcon style={{ color: '#FFD700' }} />
            ) : rating >= starValue - 0.5 ? (
              <StarHalfIcon style={{ color: '#FFD700' }} />
            ) : (
              <StarBorderIcon style={{ color: '#FFD700' }} />
            )}
          </span>
        );
      })}
    </Box>
  );
};

export default StarRating;
