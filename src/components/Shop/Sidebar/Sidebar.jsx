import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

export default function Sidebar({ onCategorySelect }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (index, category) => {
    setSelectedIndex(index);
    onCategorySelect(category); // Gọi hàm truyền từ ProductPage
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 250, px: 2 }}>
      {/* Categories Section */}
      <Typography variant="nav">Categories</Typography>
      <List aria-label="categories">
        {['All', 'Ring', 'Necklace', 'Earring', 'Bracelet'].map(
          (item, index) => (
            <ListItemButton
              key={item}
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index, item)}
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
      <Typography variant="nav">Tags</Typography>
      <List component="nav" aria-label="tags">
        {['Diamond', 'Golden', 'Silver'].map((item, index) => (
          <ListItemButton
            key={item}
            selected={selectedIndex === index + 5}
            onClick={() => handleListItemClick(index + 5, item)}
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
      <Typography variant="nav">Filter By Price</Typography>
      <List component="nav" aria-label="price-filters">
        {['Less than $10', '$10- $20', '$20- $30', '$30- $40', '$40- $50'].map(
          (item, index) => (
            <ListItemButton
              key={item}
              selected={selectedIndex === index + 10}
              onClick={() => handleListItemClick(index + 10, item)}
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
