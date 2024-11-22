import Wedding from '~/assets/images/BrowseGridHero_WomensWeddingBands_Desktop.webp';
import Eternity from '~/assets/images/QuickLink-BG-Hero-EternityRings-Desktop.webp';
import Cocktail from '~/assets/images/QuickLink-BG-Hero-CocktailRings-Desktop.webp';
import Men from '~/assets/images/Menjewe.png';
import MenRing from '~/assets/images/MenRing.png';
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

import StubEarrings_CoList from '~/assets/images/StudEarrings.webp';
import Wedding_CoList from '~/assets/images/Wedding.webp';
import Drop_CoList from '~/assets/images/DropDangleEarrings2.webp';
import Hoop_CoList from '~/assets/images/HoopEarrings2.webp';
import Men_CoList from '~/assets/images/Men.webp';
import Cocktail_CoList from '~/assets/images/CocktailRings2.webp';
import WedRing_CoList from '~/assets/images/WeddingBands2.webp';
import Eternity_CoList from '~/assets/images/EternityRings2.webp';
import Chain_CoList from '~/assets/images/ChainNecklaces.webp';
import Bold_CoList from '~/assets/images/StatementNecklaces.webp';
import Layer_CoList from '~/assets/images/LayeringNecklaces.webp';
import EveryDi_CoList from '~/assets/images/EverydayDiaNecklaces.webp';
import Stacking_CoList from '~/assets/images/ChainBracelets.webp';
import Bangle_CoList from '~/assets/images/BangleBracelets.webp';
import Tennis_CoList from '~/assets/images/TennisBracelets.webp';
import Cuff_CoList from '~/assets/images/CuffBracelets.webp';

const categoryCollections = {
  earrings: [
    { label: 'Stub', src: StubEarrings_CoList },
    { label: 'Hoop', src: Hoop_CoList },
    { label: 'Drop and Dangle', src: Drop_CoList },
    { label: 'Wedding Earrings', src: Wedding_CoList },
  ],
  rings: [
    { label: 'Eternity', src: Eternity_CoList },
    { label: 'Cocktail', src: Cocktail_CoList },
    { label: 'Wedding', src: WedRing_CoList },
    { label: "Men's", src: Men_CoList },
  ],
  necklaces: [
    { label: 'Chain', src: Chain_CoList },
    { label: 'Bold', src: Bold_CoList },
    {
      label: 'Layering',
      src: Layer_CoList,
    },
    {
      label: 'Every Diamond',
      src: EveryDi_CoList,
    },
  ],
  bracelets: [
    { label: 'Bangle', src: Bangle_CoList },
    { label: 'Tennis', src: Tennis_CoList },
    { label: 'Cuff', src: Cuff_CoList },
    { label: 'Stacking', src: Stacking_CoList },
  ],
};

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
    image: MenRing,
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

const data = { categoryCollections, collections };

export default data;
