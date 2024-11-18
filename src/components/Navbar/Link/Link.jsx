import { Typography, Box, styled } from '@mui/material';
import { useLocation } from 'react-router-dom'; // Import useLocation

const LinkContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '55px',
  // backgroundColor: '#f5f5f5',
}));

const links = [
  { name: 'RINGS', href: '/shop/rings' },
  { name: 'NECKLACES', href: '/shop/necklaces' },
  { name: 'EARRINGS', href: '/shop/earrings' },
  { name: 'BRACELETS', href: '/shop/bracelets' },
  { name: 'MEN JEWELRY', href: '/shop/men-jewelry' },
];

function Link() {
  const location = useLocation();

  return (
    <LinkContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}
      >
        {links.map((link) => (
          <Typography
            key={link.name}
            variant="nav"
            color={location.pathname === link.href ? '#db9662' : '#000'}
            component="a"
            href={link.href}
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              '&:hover': { color: '#db9662' },
            }}
          >
            {link.name}
          </Typography>
        ))}
      </Box>
    </LinkContainer>
  );
}

export default Link;
