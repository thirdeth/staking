import { FC } from 'react';
import { Box } from '@mui/material';

import { Paper, Preview, Road } from './sections';

export const Home: FC = () => {
  return (
    <Box>
      <Preview />
      <Road />
      <Paper />
      {/* <ApplyCard size="m" /> */}
    </Box>
  );
};
