import { Grid } from '@mui/material';

function Image({ images }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {images[0] && (
          <img
            src={images[0]}
            alt="Image 1"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        )}
      </Grid>
      <Grid item xs={6}>
        {images[1] && (
          <img
            src={images[1]}
            alt="Image 2"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        )}
      </Grid>
      <Grid item xs={6}>
        {images[2] && (
          <img
            src={images[2]}
            alt="Image 3"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        )}
      </Grid>
      <Grid item xs={6}>
        {images[3] && (
          <img
            src={images[3]}
            alt="Image 4"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default Image;
