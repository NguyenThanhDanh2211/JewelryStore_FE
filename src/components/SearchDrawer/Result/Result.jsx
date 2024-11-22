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
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography variant="nav" fontSize="18px">
              {product.name}
            </Typography>
            {product.discount && (
              <Typography variant="nav" fontSize="16px" color="red" ml={2}>
                {product.discount}% OFF
              </Typography>
            )}
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography
              variant="nav"
              color="#db9662"
              fontSize="16px"
              sx={{ marginRight: '8px' }}
            >
              ${' '}
              {product.discount
                ? product.finalPrice.toFixed(2)
                : product.price.toFixed(2)}
            </Typography>
            {product.discount && (
              <Typography
                variant="body2"
                sx={{ textDecoration: 'line-through', mt: '3px' }}
              >
                $ {product.price.toFixed(2)}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Link>
  );
}

export default Result;
