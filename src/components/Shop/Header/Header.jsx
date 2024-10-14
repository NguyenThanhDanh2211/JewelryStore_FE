import { Box, Divider, Grid, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const categories = [
  {
    label: 'Rings',
    path: 'rings',
    src: 'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-hardwearfreshwater-pearl-ring-in-sterling-silver-64048457_1004020_ED_M.jpg?&op_usm=1.75,1.0,6.0&$cropN=0.1,0.1,0.8,0.8&defaultImage=NoImageAvailableInternal&&defaultImage=NoImageAvailableInternal&fmt=webp',
  },
  {
    label: 'Earrings',
    path: 'earrings',
    src: 'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/paloma-picassoolive-leaf-climber-earrings-60702551_1026018_ED.jpg?&op_usm=2.0,1.0,6.0&$cropN=0.1,0.1,0.8,0.8&defaultImage=NoImageAvailableInternal&&defaultImage=NoImageAvailableInternal&fmt=webp',
  },
  {
    label: 'Necklaces',
    path: 'necklaces',
    src: 'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/return-to-tiffanyheart-tag-toggle-necklace-31406498_1027927_ED.jpg?&op_usm=1.0,1.0,6.0&$cropN=0.1,0.1,0.8,0.8&defaultImage=NoImageAvailableInternal&&defaultImage=NoImageAvailableInternal&fmt=webp',
  },
  {
    label: 'Bracelets',
    path: 'bracelets',
    src: 'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-knotdouble-row-hinged-bangle-68887240_1028564_ED_M.jpg?&op_usm=2.0,1.0,6.0&$cropN=0.1,0.1,0.8,0.8&defaultImage=NoImageAvailableInternal&&defaultImage=NoImageAvailableInternal&fmt=webp',
  },
  {
    label: "Men's Jewelry",
    path: 'men-jewelry',
    src: 'https://media.tiffany.com/is/image/Tiffany/EcomItemL2/the-charles-tiffany-settingmens-engagement-ring-69781489_1025407_ED.jpg?&op_usm=1.75,1.0,6.0&$cropN=0.1,0.1,0.8,0.8&defaultImage=NoImageAvailableInternal&&defaultImage=NoImageAvailableInternal&fmt=webp',
  },
];

function Header() {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/shop' && (
        <>
          <Divider />
          <Typography variant="h2" textAlign="center" fontSize={40}>
            Discover Our Categories Below, Where You Can Find All Our Products!
          </Typography>
        </>
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
                // to={cate.path}
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
                    variant="body2"
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
