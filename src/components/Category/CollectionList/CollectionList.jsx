import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
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
import ChainBra from '~/assets/images/ChainBracelets.webp';
import Bangle from '~/assets/images/BangleBracelets.webp';
import Tennis from '~/assets/images/TennisBracelets.webp';
import Cuff from '~/assets/images/CuffBracelets.webp';

const categoryCollections = {
  earrings: [
    {
      label: 'Stub',
      path: '/shop/earrings/collection/stub',
      src: StubEarrings,
    },
    { label: 'Hoop', path: '/shop/earrings/collection/hoop', src: Hoop },
    {
      label: 'Drop and Dangle',
      path: '/shop/earrings/collection/drop-and-dangle',
      src: Drop,
    },
    {
      label: 'Wedding',
      path: '/shop/earrings/collection/wedding',
      src: Wedding,
    },
  ],
  rings: [
    {
      label: 'Eternity',
      path: '/shop/rings/collection/eternity',
      src: Eternity,
    },
    {
      label: 'Cocktail',
      path: '/shop/rings/collection/cocktail',
      src: Cocktail,
    },
    { label: 'Wedding', path: '/shop/rings/collection/wedding', src: WedRing },
    { label: "Men's", path: '/shop/rings/collection/men', src: Men },
  ],
  necklaces: [
    { label: 'Chain', path: '/shop/necklaces/collection/chain', src: Chain },
    { label: 'Bold', path: '/shop/necklaces/collection/bold', src: Bold },
    {
      label: 'Layering',
      path: '/shop/necklaces/collection/layering',
      src: Layer,
    },
    {
      label: 'Every Diamond',
      path: '/shop/necklaces/collection/every-diamond',
      src: EveryDi,
    },
  ],
  bracelets: [
    { label: 'Bangle', path: '/shop/bracelets/collection/bangle', src: Bangle },
    { label: 'Tennis', path: '/shop/bracelets/collection/tennis', src: Tennis },
    { label: 'Cuff', path: '/shop/bracelets/collection/cuff', src: Cuff },
    { label: 'Chain', path: '/shop/bracelets/collection/chain', src: ChainBra },
  ],
};

function Collection({ category }) {
  const collections = categoryCollections[category] || [];

  return (
    <Grid container display="flex" justifyContent="center" spacing={2} mb={15}>
      {collections.map((collect) => (
        <Grid item xs={6} sm={2} key={collect.label}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link
              to={collect.path}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                textAlign: 'center',
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
                  '&:hover': {
                    border: '2px solid #db9662',
                  },
                }}
              />

              <Typography variant="body2">{collect.label}</Typography>
            </Link>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default Collection;
