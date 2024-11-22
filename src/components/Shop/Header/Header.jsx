import { Box, Grid, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import data from '~/data/shopData';
const { categories } = data;

function Header() {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/shop' && (
        <Typography variant="h2" textAlign="center" fontSize={40}>
          Discover Our Categories Below, Where You Can Find All Our Products!
        </Typography>
      )}
      <Grid container display="flex" justifyContent="center" spacing={2} mt={2}>
        {categories.map((cate) => (
          <Grid item xs={6} sm={2} key={cate.label}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link
                to={
                  location.pathname === '/'
                    ? `shop/${cate.path}`
                    : `${cate.path}`
                }
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  textAlign: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'inline-block',
                    '&:hover': {
                      '& img': {
                        border: '2px solid #db9662',
                      },
                      '& .cateLabel': {
                        color: '#db9662',
                      },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={cate.src}
                    alt={cate.label}
                    sx={{
                      borderRadius: '10px',
                      maxHeight: '50%',
                      maxWidth: '100%',
                      border: '2px solid transparent',
                      transition: 'border 0.3s',
                    }}
                  />
                  <Typography
                    className="cateLabel"
                    variant="text"
                    sx={{
                      transition: 'color 0.3s',
                    }}
                  >
                    {cate.label}
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Header;
