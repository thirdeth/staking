import { FC } from 'react';
import { Box } from '@mui/material';
import { ApplyCard } from 'components';

import { Paper, Preview, Road } from './sections';

export const Home: FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Preview />
      <Road />
      <Paper />
      <ApplyCard size="md" />
    </Box>
  );
};
