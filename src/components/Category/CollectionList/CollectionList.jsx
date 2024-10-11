import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StubEarrings from '~/assets/images/StudEarrings.webp';
import Wedding from '~/assets/images/Wedding.webp';
import Drop from '~/assets/images/DropDangleEarrings2.webp';
import Hoop from '~/assets/images/HoopEarrings2.webp';
import Men from '~/assets/images/Men.webp';
import Cocktail from '~/assets/images/CocktailRings2.webp';
import WedRing from '~/assets/images/WeddingBands2.webp';
import Eternity from '~/assets/images/EternityRings2.webp';
import Chain from '~/assets/images/ChainNecklaces.webp';
import Bold from '~/assets/images/StatementNecklaces.webp';
import Layer from '~/assets/images/LayeringNecklaces.webp';
import EveryDi from '~/assets/images/EverydayDiaNecklaces.webp';
import Stacking from '~/assets/images/ChainBracelets.webp';
import Bangle from '~/assets/images/BangleBracelets.webp';
import Tennis from '~/assets/images/TennisBracelets.webp';
import Cuff from '~/assets/images/CuffBracelets.webp';

const categoryCollections = {
  earrings: [
    { label: 'Stub', src: StubEarrings },
    { label: 'Hoop', src: Hoop },
    { label: 'Drop and Dangle', src: Drop },
    { label: 'Wedding Earrings', src: Wedding },
  ],
  rings: [
    { label: 'Eternity', src: Eternity },
    { label: 'Cocktail', src: Cocktail },
    { label: 'Wedding', src: WedRing },
    { label: "Men's", src: Men },
  ],
  necklaces: [
    { label: 'Chain', src: Chain },
    { label: 'Bold', src: Bold },
    {
      label: 'Layering',
      src: Layer,
    },
    {
      label: 'Every Diamond',
      src: EveryDi,
    },
  ],
  bracelets: [
    { label: 'Bangle', src: Bangle },
    { label: 'Tennis', src: Tennis },
    { label: 'Cuff', src: Cuff },
    { label: 'Stacking', src: Stacking },
  ],
};

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
                  variant="body2"
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
