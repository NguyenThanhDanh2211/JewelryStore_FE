import React from 'react';
import { Box, LinearProgress, Typography, styled } from '@mui/material';

const ProgressContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  margin: '10px 0',
  paddingRight: '50px',
}));

const ProgressText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 500,
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  flexGrow: 1,
  height: 8,
  borderRadius: 4,
  marginLeft: 10,
  marginRight: 10,
  backgroundColor: theme.palette.grey[300],
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#db9662',
  },
}));

function FreeShip({ totalPrice }) {
  const freeShippingThreshold = 1000;
  const progress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);
  const remainingAmount = Math.max(freeShippingThreshold - totalPrice, 0);

  return (
    <ProgressContainer>
      <ProgressText>
        {remainingAmount > 0
          ? `Spend $${remainingAmount.toLocaleString(
              'en-US'
            )} more for Free Shipping!`
          : 'You’ve unlocked Free Shipping! 🎉'}
      </ProgressText>
      <StyledLinearProgress variant="determinate" value={progress} />
      <ProgressText>{`${Math.round(progress)}%`}</ProgressText>
    </ProgressContainer>
  );
}

export default FreeShip;
