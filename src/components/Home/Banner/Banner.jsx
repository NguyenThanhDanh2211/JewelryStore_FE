import { Box, Grid, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Banner.css';

import data from '~/data/homeData';
const { slides, icons } = data;

function Banner() {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e6e6e6',
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

      <Grid
        container
        spacing={2}
        sx={{
          mb: 2,
          mt: 0.5,
        }}
      >
        {icons.map((icon, index) => (
          <Grid
            key={index}
            item
            xs={3}
            md={3}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            {icon.icon}
            <Box sx={{ ml: 1 }}>
              <Typography variant="nav" fontSize="15px">
                {icon.nav}
              </Typography>
              <Typography variant="body2" fontSize="13px" color="textSecondary">
                {icon.body}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Banner;
