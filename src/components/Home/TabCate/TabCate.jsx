import { useState } from 'react';
import { Tab, Tabs, Box, Typography, Link, Button } from '@mui/material';

import rings from '~/assets/images/rings.webp';
import bracelet from '~/assets/images/Bracelet.webp';
import earrings from '~/assets/images/earrings.webp';
import necklace from '~/assets/images/Necklaces.webp';

function TabCate() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} marginY={5}>
      {/* Tab Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {value === 0 && (
          <>
            <Box
              component="img"
              src={rings}
              sx={{
                width: '70%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
              }}
            />
            <Box
              sx={{
                width: '70%',
                margin: '0 auto',
                textAlign: 'justify',
              }}
            >
              <Typography variant="body2">
                Indulge in luxury with our expertly crafted rings, perfect for
                engagement or making a statement with a cocktail design. Each
                piece captures the brilliance of fine jewelry.
              </Typography>
            </Box>
          </>
        )}
        {value === 1 && (
          <>
            <Box
              component="img"
              src={necklace}
              sx={{
                width: '70%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
              }}
            />
            <Box
              sx={{
                width: '70%',
                margin: '0 auto',
                textAlign: 'justify',
              }}
            >
              <Typography variant="body2">
                Adorn yourself with our elegant collection of necklaces. From
                delicate pendants to bold statement pieces, our necklaces are
                crafted to add grace and glamour to any ensemble.
              </Typography>
            </Box>
          </>
        )}
        {value === 2 && (
          <>
            <Box
              component="img"
              src={earrings}
              sx={{
                width: '70%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
              }}
            />
            <Box
              sx={{
                width: '70%',
                margin: '0 auto',
                textAlign: 'justify',
              }}
            >
              <Typography variant="body2">
                Elevate your style with our stunning earrings, from classic
                studs to glamorous chandeliers. Whether pearls or diamonds, each
                piece is crafted to make a statement.
              </Typography>
            </Box>
          </>
        )}
        {value === 3 && (
          <>
            <Box
              component="img"
              src={bracelet}
              sx={{
                width: '70%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
              }}
            />
            <Box
              sx={{
                width: '70%',
                margin: '0 auto',
                textAlign: 'justify',
              }}
            >
              <Typography variant="body2">
                Discover our stunning bracelets that offer both sophistication
                and charm. Whether stacking or wearing solo, these bracelets
                will add a stylish touch to your look.
              </Typography>
            </Box>
          </>
        )}

        <Link href="/shop">
          <Button
            variant="single"
            size="large"
            sx={{
              my: 2,
              alignItems: 'flex-start',
              textAlign: 'left',
              '&:hover': {
                backgroundColor: '#b8764d',
              },
            }}
          >
            SHOP NOW
          </Button>
        </Link>
      </Box>

      {/* Tabs Section */}
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{
          minWidth: '500px',
          '.MuiTabs-indicator': { display: 'none' },
          '& .MuiTab-root': {
            alignItems: 'flex-start',
            textAlign: 'left',
          },
        }}
      >
        <Tab
          disableRipple
          label={
            <>
              <Typography
                variant="h2"
                sx={{
                  color: value === 0 ? '#db9662' : 'rgb(154, 154, 154)',
                  textTransform: 'none',
                  marginBottom: '4px',
                }}
              >
                01
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  color: value === 0 ? '#db9662' : 'rgb(154, 154, 154)',
                  textTransform: 'none',
                  fontSize: 60,
                }}
              >
                Rings
              </Typography>
            </>
          }
        />

        <Tab
          disableRipple
          label={
            <>
              <Typography
                variant="h2"
                sx={{
                  color: value === 1 ? '#db9662' : 'rgb(154, 154, 154)',
                  textTransform: 'none',
                  marginBottom: '4px',
                }}
              >
                02
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  color: value === 1 ? '#db9662' : 'rgb(154, 154, 154)',
                  textTransform: 'none',
                  fontSize: 60,
                }}
              >
                Necklaces
              </Typography>
            </>
          }
        />

        <Tab
          disableRipple
          label={
            <>
              <Typography
                variant="h2"
                sx={{
                  color: value === 2 ? '#db9662' : 'rgb(154, 154, 154)',
                  textTransform: 'none',
                  marginBottom: '4px',
                }}
              >
                03
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  color: value === 2 ? '#db9662' : 'rgb(154, 154, 154)',
                  textTransform: 'none',
                  fontSize: 60,
                }}
              >
                Earrings
              </Typography>
            </>
          }
        />

        <Tab
          disableRipple
          label={
            <>
              <Typography
                variant="h2"
                sx={{
                  color: value === 3 ? '#db9662' : 'rgb(154, 154, 154)',
                  textTransform: 'none',
                  marginBottom: '4px',
                }}
              >
                04
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  color: value === 3 ? '#db9662' : 'rgb(154, 154, 154)',
                  textTransform: 'none',
                  fontSize: 60,
                }}
              >
                Bracelets
              </Typography>
            </>
          }
        />
      </Tabs>
    </Box>
  );
}

export default TabCate;
