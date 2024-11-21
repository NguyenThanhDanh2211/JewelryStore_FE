import { Box, Typography } from '@mui/material';

import video from '~/assets/videos/video-1.mp4';

function Video() {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '550px',
          objectFit: 'cover',
        }}
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Text Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 'bold',
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
          }}
        >
          Your perfect jewelry, handmade with passion and precision.
        </Typography>
      </Box>
    </Box>
  );
}

export default Video;
