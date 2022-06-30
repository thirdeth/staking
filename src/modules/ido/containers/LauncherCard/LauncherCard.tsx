import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { BG_GRAY, BORDER_RADIUS_CARD_MEDIUM } from 'theme/variables';
import { Modals } from 'types';

import { LauncherControls, LauncherInfo, LauncherProgress } from './components';
import { ProgressLauncherDataProps } from './LauncherCard.types';

export type LauncherCardProps = {
  progressData: ProgressLauncherDataProps;
  onOpenModal: (modalType: Modals) => void;
};

export const LauncherCard: FC<LauncherCardProps> = ({ progressData, onOpenModal }) => {
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
        <LauncherInfo progressData={progressData} />
        <LauncherProgress progressData={progressData} />
        <LauncherControls onOpenModal={onOpenModal} />
      </Grid>
    </Box>
  );
};
