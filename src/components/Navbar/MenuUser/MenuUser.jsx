import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Menu, MenuItem } from '@mui/material';

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
      <MenuItem>
        <Link href="/me" sx={{ textDecoration: 'none' }}>
          My Account
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );
}

export default MenuUser;
