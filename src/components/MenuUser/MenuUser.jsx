// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { Menu, MenuItem } from '@mui/material';

// function MenuUser({ open, handleCloseMenu }) {
//   const [userName, setUserName] = useState(null);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Remove token from local storage
//     navigate('/login');
//     localStorage.removeItem('authToken');
//     setUserName(null);
//   };

//   return (
//     <>
//       <Menu
//         open={open}
//         onClose={handleCloseMenu}
//         sx={{
//           top: 0,
//           right: '50px',
//         }}
//       >
//         <MenuItem>My Account</MenuItem>
//         <MenuItem onClick={handleLogout}>Log out</MenuItem>
//       </Menu>
//     </>
//   );
// }

// export default MenuUser;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';

function MenuUser({ anchorEl, handleCloseMenu }) {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl); // Mở menu khi có anchorEl

  const handleLogout = () => {
    // Remove token from local storage
    navigate('/login');
    localStorage.removeItem('authToken');
    setUserName(null);
    handleCloseMenu();
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl} // Xác định vị trí menu
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
    </>
  );
}

export default MenuUser;
