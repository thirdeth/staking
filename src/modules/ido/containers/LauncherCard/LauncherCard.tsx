import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { BG_GRAY, BORDER_RADIUS_CARD_MEDIUM } from 'theme/variables';

import { LauncherControls, LauncherInfo, LauncherProgress } from './components';
import { ProgressLauncherDataProps } from './LauncherCard.types';

export type LauncherCardProps = {
  saledEndTime: number;
  progressData: ProgressLauncherDataProps;
};

export const LauncherCard: FC<LauncherCardProps> = ({ saledEndTime, progressData }) => {
  return (
    <Box
      sx={{
        py: 4.3,
        px: { xs: 2, sm: 2, md: 3 },
        background: BG_GRAY,
        borderRadius: BORDER_RADIUS_CARD_MEDIUM,
      }}
    >
      <Grid container direction="column" justifyContent="center" alignItems="space-between">
        <LauncherInfo saledEndTime={saledEndTime} />
        <LauncherProgress progressData={progressData} />
        <LauncherControls />
      </Grid>
    </Box>
  );
};
