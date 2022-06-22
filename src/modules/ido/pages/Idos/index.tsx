import { FC } from 'react';
import { Box } from '@mui/material';
import { LauncherCard } from 'modules/ido/containers';

const SALET_END_TIME_MOCK = 1234567891011;

const PROGRESS_DATA_MOCK = {
  progress: 70,
  totalRaise: 10,
  allocation: 10,
  targetRaise: 10,
};

export const Idos: FC = () => {
  return (
    <Box>
      <LauncherCard saledEndTime={SALET_END_TIME_MOCK} progressData={PROGRESS_DATA_MOCK} />
    </Box>
  );
};
