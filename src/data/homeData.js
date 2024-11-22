import img1 from '~/assets/images/story.jpg';
import img2 from '~/assets/images/banner-10.jpg';
import img3 from '~/assets/images/banner-13.jpg';
import img4 from '~/assets/images/banner-12.jpg';

import slide1 from '~/assets/images/slider-05.jpg';
import slide2 from '~/assets/images/story1.png';
import slide3 from '~/assets/images/slider-02.jpg';

import {
  FlexiblePayment,
  FreeShipping,
  Money,
  OnlineSupport,
} from '~/components/Icons';

import b1 from '~/assets/images/b1.webp';
import b2 from '~/assets/images/b2.jpg';
import b3 from '~/assets/images/b3.jpg';
import b4 from '~/assets/images/b4.jpg';

const blogs = [
  {
    img: b1,
    title: 'THE ULTIMATE GUIDE TO STYLING GOLD JEWELRY',
    date: '18 Jul 2024',
    content:
      'Discover tips on pairing gold jewelry with any outfit for a timeless look.',
  },
  {
    img: b2,
    title: '10 JEWELRY GIFTING IDEAS FOR ANY SPECIAL OCCASION',
    date: '20 Sep 2024',
    content:
      'Find the perfect jewelry gifts to celebrate life’s special moments.',
  },
  {
    img: b3,
    title: 'HOW TO CHOOSE GIFTS FOR WOMEN IN 6 STEPS',
    date: '16 Oct 2024',
    content:
      'A simple guide to selecting meaningful gifts for the special women in your life.',
  },
  {
    img: b4,
    title: 'AUSTRALIAN FASHION: CHRISTMAS & SUMMER OUTFIT IDEAS',
    date: '22 Nov 2024',
    content:
      'Blend festive cheer with summer vibes through these stylish outfit inspirations.',
  },
];

const images = [
  {
    src: img1,
    href: '/shop/men-jewelry',
    content: 'Bold designs for modern men.',
    label: "MEN'S JEWELRY",
    size: 516,
  },
  {
    src: img2,
    href: '/shop/necklaces?collection=Layering',
    content: 'Perfect for layered looks.',
    label: 'LAYERING NECKLACES',
    size: 250,
  },
  {
    src: img3,
    href: '/shop/rings?collection=Wedding',
    content: 'Rings for your big day.',
    label: ' WEDDING RINGS',
    size: 250,
  },
  {
    src: img4,
    href: '/shop/earrings?collection=Drop%20and%20Dangle',
    content: 'Elegant drop earrings.',
    label: ' DROP AND DANGLE EARINGS',
    size: 250,
  },
];

const slides = [
  {
    src: slide1,
    alt: 'Slide 1',
    title: 'Timeless Treasures',
    content: 'Jewelry, like love, is precious and eternal',
  },
  {
    src: slide2,
    alt: 'Slide 2',
    title: 'We Love You Larger',
    content: 'Beautifully crafted jewelry to cherish every day',
  },
  {
    src: slide3,
    alt: 'Slide 3',
    title: 'Bold, Brilliant, Beautiful',
    content: 'Jewelry is a lot like love; it’s a good idea but expensive',
  },
];

const icons = [
  {
    icon: <FreeShipping />,
    nav: 'Free Shipping',
    body: 'Free shipping for orders over $130',
  },
  {
    icon: <Money />,
    nav: 'Money Guarantee',
    body: 'Within 30 days for an exchange',
  },
  {
    icon: <OnlineSupport />,
    nav: 'Online Support',
    body: '24 hours a day, 7 days a week',
  },
  {
    icon: <FlexiblePayment />,
    nav: 'Flexible Payment',
    body: 'Pay with multiple Credit Cards',
  },
];

const data = { blogs, images, slides, icons };
export default data;
