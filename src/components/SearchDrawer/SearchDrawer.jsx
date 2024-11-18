import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Drawer,
  InputBase,
  Typography,
  InputAdornment,
  IconButton,
  Grid,
} from '@mui/material';
import { styled } from '@mui/system';

import CloseIcon from '@mui/icons-material/Close';

import { SearchIcon } from '../Icons';
import useDebounce from '~/hooks/useDebounce';
import { search } from '~/services/productService';
import Result from './Result';

const SearchInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5, 1),
  border: '1px solid #ccc',
  borderRadius: theme.shape.borderRadius,
  fontSize: '1rem',
  '&:focus': {
    borderColor: theme.palette.primary.main,
  },
}));

function SearchDrawer({ open, toggleSearchDrawer }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [notFound, setNotFound] = useState('');

  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (!debouncedValue) {
      setSearchResult([]);
      setNotFound('');
      return;
    }

    const fetchSearch = async () => {
      try {
        const result = await search(debouncedValue);
        if (result && result.length > 0) {
          setSearchResult(result);
          setNotFound('');
        } else {
          setSearchResult([]);
          setNotFound('Sorry, no results matched your search.');
        }
      } catch (error) {
        setSearchResult([]);
        setNotFound('Error fetching search results. Please try again.');
      }
    };

    fetchSearch();
  }, [debouncedValue]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  return (
    <Drawer anchor="top" open={open} onClose={toggleSearchDrawer(false)}>
      <Box px={15} py={5} width="100%" display="flex" flexDirection="column">
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
          ref={inputRef}
          value={searchValue}
          onChange={handleChange}
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

      {searchValue && (
        <Box px={15} width="100%" display="flex" flexDirection="column" mb={1}>
          <Grid container spacing={1}>
            {searchResult.length > 0 ? (
              searchResult.map((product) => (
                <Grid item xs={4} key={product._id} className="product-item">
                  <Result product={product} />
                </Grid>
              ))
            ) : (
              <Typography variant="nav" color="rgb(154, 154, 154)" ml={1}>
                {notFound}
              </Typography>
            )}
          </Grid>
        </Box>
      )}
    </Drawer>
  );
}

export default SearchDrawer;
