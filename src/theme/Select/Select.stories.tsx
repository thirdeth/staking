import { Box, MenuItem, Select } from '@mui/material';

export default {
  title: 'theme/Select',
};

export const Default = () => (
  <Box sx={{ flexGrow: 1, p: 2 }}>
    <Select variant="filled" sx={{ width: '300px' }}>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </Box>
);
