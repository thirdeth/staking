import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { ProjectDataProps } from 'modules/ido/pages/Details/Details.types';
import { BG_GRAY, BORDER_RADIUS_CARD_MEDIUM } from 'theme/variables';
import { Nullable } from 'types';

import { LauncherControls, LauncherInfo, LauncherProgress } from './components';

export type LauncherCardProps = {
  userAllocation: Nullable<string>;
  isRegistration: boolean;
} & ProjectDataProps;

export const LauncherCard: FC<LauncherCardProps> = ({ projectData, userAllocation, isRegistration }) => {
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
        <LauncherInfo projectData={projectData} />
        <LauncherProgress projectData={projectData} userAllocation={userAllocation} />
        <LauncherControls projectData={projectData} isRegistration={isRegistration} />
      </Grid>
    </Box>
  );
};
