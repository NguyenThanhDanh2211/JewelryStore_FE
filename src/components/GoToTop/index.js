import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ScrollToTopButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: '#db9662',
  //   backgroundColor: '#b8764d',
  color: '#fff',
  borderRadius: '50%',
  zIndex: 1000,
  opacity: 0.7,
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 1,
  },
}));

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <ScrollToTopButton onClick={scrollToTop}>
          <ArrowUpwardIcon />
        </ScrollToTopButton>
      )}
    </>
  );
};

export default GoToTop;
