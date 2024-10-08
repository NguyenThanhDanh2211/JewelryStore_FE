import { Box, Grid, Link, Typography } from '@mui/material';

function Result({ product }) {
  const { slug, category } = product;
  return (
    <Link
      href={`/shop/${category.toLowerCase()}/${slug}`}
      sx={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Grid
        item
        container
        xs={12}
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{
          border: '1px solid #ccc',
          borderRadius: 1,
          padding: 1,
          //   marginBottom: 2,
        }}
      >
        <Grid xs={2}>
          <Box
            component="img"
            src={product.image[0]}
            alt={product.name}
            sx={{ width: '80%', height: 'auto' }}
          />
        </Grid>
        <Grid xs={10} item display="flex" flexDirection="column" spacing={2}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography variant="text1">$ {product.price.toFixed(2)}</Typography>
        </Grid>
      </Grid>
    </Link>
  );
}

export default Result;
