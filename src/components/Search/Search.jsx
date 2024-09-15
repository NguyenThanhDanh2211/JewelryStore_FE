import { Box, Input, Typography } from '@mui/material';

const ariaLabel = { 'aria-label': 'description' };

function Search() {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        p: 4,
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" component="div">
        Search
      </Typography>
      <Input
        placeholder="Search..."
        inputProps={ariaLabel}
        fullWidth
        sx={{ marginTop: 2 }}
      />
    </Box>
  );
}

export default Search;
