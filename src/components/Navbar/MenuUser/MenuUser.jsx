import { useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Menu, MenuItem, Link, Divider, Typography } from '@mui/material';

import { CartContext } from '~/contexts/CartContext';
import { AuthContext } from '~/contexts/AuthContext';

function MenuUser({ anchorEl, handleCloseMenu }) {
  const { resetCart } = useContext(CartContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    logout();
    resetCart();
    navigate('/login');
    handleCloseMenu();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleCloseMenu}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem onClick={handleCloseMenu}>
        <Link
          component={RouterLink}
          to="/me"
          sx={{
            textDecoration: 'none',
          }}
        >
          <Typography variant="text1">My Account</Typography>
        </Link>
      </MenuItem>

      <MenuItem onClick={handleCloseMenu}>
        <Link
          component={RouterLink}
          to="/order"
          sx={{
            textDecoration: 'none',
          }}
        >
          <Typography variant="text1">My Orders</Typography>
        </Link>
      </MenuItem>

      {/* Divider to separate menu sections */}
      <Divider />

      <MenuItem onClick={handleLogout} className="logout-icon">
        <Typography variant="text1" sx={{ color: 'red' }}>
          Log out
        </Typography>
      </MenuItem>
    </Menu>
  );
}

export default MenuUser;
