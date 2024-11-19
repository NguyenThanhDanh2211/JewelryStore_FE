import { Box, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Banner.css';

import slide1 from '~/assets/images/slider-01-1.jpg';
import slide2 from '~/assets/images/slider-02.jpg';
import slide3 from '~/assets/images/slider-03.jpg';

const slides = [
  {
    src: slide1,
    alt: 'Slide 1',
    title: 'Timeless Treasures',
    content: 'Jewelry, like love, is precious and eternal',
  },
  {
    src: slide2,
    alt: 'Slide 2',
    title: 'We Love You Larger',
    content: 'Beautifully crafted jewelry to cherish every day',
  },
  {
    src: slide3,
    alt: 'Slide 3',
    title: 'Bold, Brilliant, Beautiful',
    content: 'Jewelry is a lot like love; it’s a good idea but expensive',
  },
];

function Banner() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const endDate = new Date('2024-12-31T23:59:59');
    const now = new Date();
    const difference = endDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Swiper for Banner Images */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        style={{ width: '100%', height: '600px' }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.src}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '600px',
              }}
            >
              <Box
                component="img"
                src={slide.src}
                alt={slide.alt}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              <Typography
                sx={{
                  position: 'absolute',
                  top: '40%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '4rem',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                  textAlign: 'center',
                }}
              >
                {slide.title}
              </Typography>

              <Typography
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontSize: '1.5rem',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                  textAlign: 'center',
                  mt: 2,
                }}
              >
                {slide.content}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Countdown Section */}
      <Grid
        container
        spacing={2}
        sx={{
          textAlign: 'center',
          alignItems: 'center',
          mt: 2,
          mb: 2,
        }}
      >
        <Grid item xs={12} md={4}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Winter Sale
          </Typography>
          <Typography variant="body2" sx={{ color: '#555' }}>
            20% Off Everything for a limited time only
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            <Box>
              <Typography variant="h6">{timeLeft.days}</Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                Days
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">{timeLeft.hours}</Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                Hours
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">{timeLeft.minutes}</Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                Minutes
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">{timeLeft.seconds}</Typography>
              <Typography variant="body2" sx={{ color: '#555' }}>
                Seconds
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography
            component="a"
            href="/shop"
            variant="nav"
            sx={{
              textDecoration: 'none',
              color: '#db9662',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '1rem',
            }}
          >
            SHOP COLLECTION
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Banner;
