import { Box, TextField } from '@mui/material';

export default {
  title: 'theme/TextField',
};

export const Default = () => (
  <Box sx={{ flexGrow: 1, p: 2 }}>
    <TextField placeholder="Search name or past address" sx={{ width: 400 }} />
  </Box>
);
