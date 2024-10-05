import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

function Sidebar({ onCategorySelect, onTagSelect, onPriceRangeSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (index, category) => {
    setSelectedIndex(index);
    onCategorySelect(category);

    if (index < 5) {
      onTagSelect(null);
      onPriceRangeSelect(null);
    }
  };

  const handleTagClick = (index, tag) => {
    setSelectedIndex(index);
    onTagSelect(tag);
  };

  const handlePriceClick = (index, range) => {
    setSelectedIndex(index);
    onPriceRangeSelect(range);
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

      {/* Materials Section */}
      <Typography variant="nav">Materials</Typography>
      <List component="nav" aria-label="tags">
        {['Diamond', 'Golden', 'Silver'].map((item, index) => (
          <ListItemButton
            key={item}
            selected={selectedIndex === index + 5}
            onClick={() => handleTagClick(index + 5, item)}
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
        {[
          { label: 'Less than $10', range: [0, 10] },
          { label: '$10 - $20', range: [10, 20] },
          { label: '$20 - $30', range: [20, 30] },
          { label: '$30 - $40', range: [30, 40] },
          { label: '$40 - $50', range: [40, 50] },
        ].map((item, index) => (
          <ListItemButton
            key={item.label}
            selected={selectedIndex === index + 10}
            onClick={() => handlePriceClick(index + 10, item.range)}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                variant: 'body2',
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
