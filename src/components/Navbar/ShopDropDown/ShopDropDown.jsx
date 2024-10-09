import { MenuItem, Link, Menu, Typography, Box } from '@mui/material';

const categories = [
  { label: 'Rings', path: '/shop/rings' },
  { label: 'Earrings', path: '/shop/earrings' },
  { label: 'Necklaces', path: '/shop/necklaces' },
  { label: 'Bracelets', path: '/shop/bracelets' },
  { label: "Men's Jewelry", path: '/shop/men-jewelry' },
];

function ShopDropdown({ anchorShopEl, handleShopClose }) {
  return (
    <Menu
      anchorEl={anchorShopEl}
      open={Boolean(anchorShopEl)}
      onClose={handleShopClose}
      MenuListProps={{
        onMouseLeave: handleShopClose,
      }}
    >
      {categories.map((category) => (
        <MenuItem key={category.label} onClick={handleShopClose}>
          <Box
            component={Link}
            href={category.path}
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography variant="text1">{category.label}</Typography>
          </Box>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default ShopDropdown;
