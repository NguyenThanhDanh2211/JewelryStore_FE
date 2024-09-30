import {
  Box,
  Drawer,
  InputBase,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';

import CloseIcon from '@mui/icons-material/Close';

import { SearchIcon } from '../Icons';

const SearchInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5, 2),
  border: '1px solid #ccc',
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: '#f9f9f9',
  fontSize: '1rem',
  '&:focus': {
    borderColor: theme.palette.primary.main,
  },
}));

function Search({ open, toggleSearchDrawer }) {
  return (
    <Drawer anchor="top" open={open} onClose={toggleSearchDrawer(false)}>
      <Box
        px={10}
        py={5}
        width="100%"
        display="flex"
        flexDirection="column"
        // alignItems="center"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          mb={2}
        >
          <Typography variant="text1">WHAT ARE YOU LOOKING FOR?</Typography>
          <IconButton onClick={toggleSearchDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <SearchInput
          placeholder="Search Products"
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
    </Drawer>
  );
}

export default Search;
