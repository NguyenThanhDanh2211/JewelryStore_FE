import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    // Add filter logic here if needed
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 250, px: 2 }}>
      {/* Categories Section */}
      <Typography variant="nav">Categories</Typography>
      <List aria-label="categories">
        {['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'].map(
          (item, index) => (
            <ListItemButton
              key={item}
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
            >
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  variant: 'body2',
                }}
              />
            </ListItemButton>
          )
        )}
      </List>

      {/* Tags Section */}
      <Typography variant="nav" sx={{}}>
        Tags
      </Typography>
      <List component="nav" aria-label="tags">
        {['Golden', 'Silver', 'Earrings', 'Luxury'].map((item, index) => (
          <ListItemButton
            key={item}
            selected={selectedIndex === index + 5}
            onClick={() => handleListItemClick(index + 5)}
          >
            <ListItemText
              primary={item}
              primaryTypographyProps={{
                variant: 'body2',
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Brands Section */}
      <Typography variant="nav" sx={{}}>
        Brands
      </Typography>
      <List component="nav" aria-label="brands">
        {['LuxeGem', 'GemAura', 'SparkleShine'].map((item, index) => (
          <ListItemButton
            key={item}
            selected={selectedIndex === index + 10}
            onClick={() => handleListItemClick(index + 10)}
          >
            <ListItemText
              primary={item}
              primaryTypographyProps={{
                variant: 'body2',
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Filter By Price Section */}
      <Typography variant="nav" sx={{}}>
        Filter By Price
      </Typography>
      <List component="nav" aria-label="price-filters">
        {['Less than $10', '$10- $20', '$20- $30', '$30- $40', '$40- $50'].map(
          (item, index) => (
            <ListItemButton
              key={item}
              selected={selectedIndex === index + 15}
              onClick={() => handleListItemClick(index + 15)}
            >
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  variant: 'body2',
                }}
              />
            </ListItemButton>
          )
        )}
      </List>
    </Box>
  );
}
