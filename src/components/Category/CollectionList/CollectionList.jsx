import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import data from '~/data/categoryData';
const { categoryCollections } = data;

function CollectionList({ category, onSelectCollection }) {
  const navigate = useNavigate();

  const handleCollectionClick = (collect) => {
    onSelectCollection(collect.label);
    navigate(`/shop/${category}?collection=${collect.label}`);
  };

  const collections = categoryCollections[category] || [];

  return (
    <Grid container display="flex" justifyContent="center" spacing={2} mb={5}>
      {collections.map((collect) => (
        <Grid item xs={6} sm={2} key={collect.label}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              onClick={() => handleCollectionClick(collect)}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                textAlign: 'center',
                cursor: 'pointer',
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
                  src={collect.src}
                  alt={collect.label}
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
                  {collect.label}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default CollectionList;
