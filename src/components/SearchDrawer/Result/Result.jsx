import { Box, Grid, Link, Typography } from '@mui/material';

function Result({ product }) {
  const { slug, category } = product;
  return (
    <Link
      href={`/shop/${category.toLowerCase()}/${slug}`}
      sx={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Grid
        container
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{
          border: '1px solid #ccc',
          borderRadius: 1,
          padding: 1,
        }}
      >
        <Grid item xs={2}>
          <Box
            component="img"
            src={product.image[0]}
            alt={product.name}
            sx={{ width: '80%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={10} display="flex" flexDirection="column">
          <Typography variant="h2">{product.name}</Typography>
          <Typography variant="text1">$ {product.price.toFixed(2)}</Typography>
        </Grid>
      </Grid>
    </Link>
  );
}

export default Result;
