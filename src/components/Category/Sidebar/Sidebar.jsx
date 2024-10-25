import React, { useState } from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';

function Sidebar({
  onTagSelect,
  onPriceRangeSelect,
  onSortSelect,
  setFilters,
}) {
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  const handleMaterialChange = (event) => {
    const material = event.target.value;
    setSelectedMaterial(material);
    onTagSelect(material);
  };

  const handlePriceRangeChange = (event) => {
    const range = event.target.value;

    if (range) {
      const [min, max] = JSON.parse(range).map(Number);
      setFilters((prevFilters) => ({
        ...prevFilters,
        minPrice: min || null,
        maxPrice: max || null,
      }));
      setSelectedPriceRange(range);
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        minPrice: null,
        maxPrice: null,
      }));
      setSelectedPriceRange('');
    }
  };

  const handleSortChange = (event) => {
    const sortOption = event.target.value;
    setSelectedSort(sortOption);
    onSortSelect(sortOption);
  };

  const handleClearAll = () => {
    setSelectedMaterial('');
    setSelectedPriceRange('');
    setSelectedSort('');
    onTagSelect(null);
    onPriceRangeSelect(null);
    onSortSelect(null);
    setFilters({
      tag: null,
      minPrice: null,
      maxPrice: null,
      sort: null,
    });
  };

  const priceRanges = [
    { label: 'Less than $100', value: JSON.stringify([0, 100]) },
    { label: '$101 - $300', value: JSON.stringify([101, 300]) },
    { label: '$301 - $500', value: JSON.stringify([301, 500]) },
    { label: 'Over $500', value: JSON.stringify([500, Infinity]) },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 250, px: 2 }}>
      {/* Materials Section */}
      <Typography variant="nav">Materials</Typography>
      <RadioGroup value={selectedMaterial} onChange={handleMaterialChange}>
        {['Diamond', 'Golden', 'Silver'].map((material) => (
          <FormControlLabel
            key={material}
            value={material}
            control={
              <Radio
                sx={{
                  '&.Mui-checked': {
                    color: '#db9662',
                  },
                }}
              />
            }
            label={material}
          />
        ))}
      </RadioGroup>

      {/* Filter By Price Section */}
      <Typography variant="nav">Filter By Price</Typography>
      <RadioGroup value={selectedPriceRange} onChange={handlePriceRangeChange}>
        {priceRanges.map((price) => (
          <FormControlLabel
            key={price.label}
            value={price.value}
            control={
              <Radio
                sx={{
                  '&.Mui-checked': {
                    color: '#db9662',
                  },
                }}
              />
            }
            label={price.label}
          />
        ))}
      </RadioGroup>

      {/* Sort By Section */}
      <Typography variant="nav">Sort By</Typography>
      <RadioGroup value={selectedSort} onChange={handleSortChange}>
        {['Price: Low to High', 'Price: High to Low', 'Newest Arrivals'].map(
          (sortOption) => (
            <FormControlLabel
              key={sortOption}
              value={sortOption}
              control={
                <Radio
                  sx={{
                    '&.Mui-checked': {
                      color: '#db9662',
                    },
                  }}
                />
              }
              label={sortOption}
            />
          )
        )}
      </RadioGroup>

      {/* Clear All Button */}
      <Box mt={2}>
        <Button variant="outlined" fullWidth onClick={handleClearAll}>
          Clear All
        </Button>
      </Box>
    </Box>
  );
}

export default Sidebar;
