import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';

import { CartContext } from '~/contexts/CartContext';

function MenuUser({ anchorEl, handleCloseMenu }) {
  const { resetCart } = useContext(CartContext);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
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
      <MenuItem>My Account</MenuItem>
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );
}

export default MenuUser;
