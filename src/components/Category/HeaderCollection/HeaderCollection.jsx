import { Grid, Typography, Box } from '@mui/material';

import Wedding from '~/assets/images/BrowseGridHero_WomensWeddingBands_Desktop.webp';
import Eternity from '~/assets/images/QuickLink-BG-Hero-EternityRings-Desktop.webp';
import Cocktail from '~/assets/images/QuickLink-BG-Hero-CocktailRings-Desktop.webp';
import Men from '~/assets/images/2024-Icons-BG-2x2-Onfig-Schlum1.png';
import Stub from '~/assets/images/StudEarrings-Desktop.webp';
import Hoop from '~/assets/images/QuickLink-BG-Hero-HoopEarrings-Desktop.webp';
import Drop from '~/assets/images/QuickLink-BG-Hero-DropDangleEarrings-Desktop.webp';
import WeddingEarrings from '~/assets/images/QuickLink-BG-Hero-StatementEarrings-Desktop.webp';
import Diamond from '~/assets/images/PLP_BG-Hero-EverydyaDiaNecklaces-Desktop.webp';
import Layering from '~/assets/images/PLP_BG-Hero-LayeringNecklaces-Desktop.webp';
import Chain from '~/assets/images/PLP_BG-Hero-ChainNecklaces-Desktop.webp';
import Bold from '~/assets/images/PLP_BG-Hero-StatementNecklaces-Desktop.webp';
import Tennis from '~/assets/images/PLP_BG-Hero-TennisBracelets-Desktop.webp';
import Stacking from '~/assets/images/PLP_BG-Hero-StackingBracelets-Desktop.webp';
import Cuff from '~/assets/images/PLP_BG-Hero-Cuffs-Desktop.webp';

function HeaderCollection({ collectionType }) {
  const collections = {
    'Men-jewelry': {
      image: Men,
      title: "Men's Jewelry",
      description:
        'With an emphasis on uncomplicated design and heritage craft techniques, our jewelry for men shows off artisanal workmanship at its best. Discover definitive jewelry pieces for the modern man.',
    },
    Tennis: {
      image: Tennis,
      title: 'Tennis Bracelets',
      description:
        'An iconic design that was originally sported by players on the court, the tennis bracelet has become an elegant style staple. Explore diamond tennis bracelets, sapphire tennis bracelets and more.',
    },
    Stacking: {
      image: Stacking,
      title: 'Stacking Bracelets',
      description:
        'Curate a signature bracelet stack with our most-wanted designs. From delicate chains to statement cuffs, these pieces work well together.',
    },
    Cuff: {
      image: Cuff,
      title: 'Cuff Bracelets',
      description:
        "From larger-than-life cuffs to sleek designs, these are the pieces you'll find yourself reaching for again and again.",
    },
    Bangle: {
      image: Chain,
      title: 'Bangles',
      description:
        'Our collection of sterling silver and 18k yellow, white and rose gold bangles feature eye-catching details and sparkling diamonds—a must-have to transform any day or night ensemble.',
    },
    Chain: {
      image: Chain,
      title: 'Chain Necklaces',
      description:
        'Whether worn solo or layered together, chains are a jewelry must-have. Discover yellow gold chains, rose gold chains and sterling silver chains.',
    },
    Bold: {
      image: Bold,
      title: 'Bold Necklaces',
      description:
        'From oversized chains to diamond-embellished designs, these necklaces are sure to make a lasting impression.',
    },

    Wedding: {
      image: Wedding,
      title: " Women's Wedding Bands",
      description:
        "Symbols of enduring partnership and commitment, our wedding rings for women feature classic and contemporary designs crafted by Tiffany's master artisans.",
    },
    Eternity: {
      image: Eternity,
      title: 'Eternity Rings',
      description:
        "Meticulously crafted with Tiffany's renowned diamonds, these are rings to wear—and love—for eternity. Wear one on its own or stacked with an engagement ring.",
    },
    Cocktail: {
      image: Cocktail,
      title: 'Cocktail Rings',
      description:
        "From diamond cocktail rings to emerald cocktail rings and more, these extraordinary designs showcase the world's most beautiful gemstones and finest craftsmanship.",
    },
    "Men's": {
      image: Men,
      title: "Men's Rings",
      description:
        'Our rings for men feature thoughtfully designed styles, precisely crafted with traditional techniques. Discover sleek band rings and signet rings, which can be personalized with a monogram or date.',
    },
    Stub: {
      image: Stub,
      title: 'Stud Earrings',
      description:
        'From delicate diamond studs to statement rose gold designs, our style-defining earrings are striking worn solo or as part of an earring stack.',
    },
    Hoop: {
      image: Hoop,
      title: 'Hoop Earrings',
      description:
        'A jewelry box essential, hoops work equally well for day or night. Explore expertly crafted diamond hoop earrings, gold hoop earrings, sterling silver hoop earrings and more.',
    },
    'Drop and Dangle': {
      image: Drop,
      title: 'Drop and Dangle Earrings',
      description:
        'From classic styles to bold takes, our collection of drop earrings turns heads every time. ',
    },
    'Wedding Earrings': {
      image: WeddingEarrings,
      title: 'Bridal & Wedding Earrings',
      description:
        'Complete your bridal look with elegant wedding earrings to make your celebration extra special. From dramatic drop earrings to sparkling diamond studs, these will be treasured on your big day and for years to come. ',
    },
    'Every Diamond': {
      image: Diamond,
      title: 'Everyday Diamond Necklaces',
      description:
        'These striking diamond necklaces are designed to be worn on repeat.',
    },
    Layering: {
      image: Layering,
      title: 'Layering Necklaces',
      description:
        'Why stop at just one necklace? Whether you choose two, three or more, these designs are perfect for creating an effortless layered necklace look.',
    },
  };

  const data = collections[collectionType];

  if (!data) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        height: '350px',
        backgroundImage: `url(${data.image})`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Grid item container xs={5} ml={3}>
        <Typography variant="h3">{data.title}</Typography>
        <Box sx={{ textAlign: 'justify' }}>
          <Typography variant="text">{data.description}</Typography>
        </Box>
      </Grid>
    </Box>
  );
}

export default HeaderCollection;
