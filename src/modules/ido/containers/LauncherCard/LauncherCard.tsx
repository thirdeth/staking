import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { ProjectDataProps } from 'modules/ido/pages/Details/Details.types';
import { BG_GRAY, BORDER_RADIUS_DEFAULT } from 'theme/variables';
import { Nullable } from 'types';

import { LauncherControls, LauncherInfo, LauncherProgress } from './components';

export type LauncherCardProps = {
  userAllocation: Nullable<string>;
  isCanAddLiquidity: boolean;
  isRegistration: boolean;
  isGettingInvestmentsInfo: boolean;
  isAddingLiquidity: boolean;
  onAddLiauidity: () => void;
} & ProjectDataProps;

export const LauncherCard: FC<LauncherCardProps> = ({
  projectData,
  isCanAddLiquidity,
  userAllocation,
  isRegistration,
  isGettingInvestmentsInfo,
  isAddingLiquidity,
  onAddLiauidity,
}) => {
  return (
    <Box
      sx={{
        py: 4.3,
        px: { xs: 2, sm: 2, md: 3 },
        background: BG_GRAY,
        borderRadius: BORDER_RADIUS_DEFAULT,
        minHeight: { xs: 'auto', sm: 'auto', md: '340px' },
      }}
    >
      <Grid container direction="column" justifyContent="center" alignItems="space-between">
        <LauncherInfo projectData={projectData} />
        <LauncherProgress
          projectData={projectData}
          userAllocation={userAllocation}
          isGettingInvestmentsInfo={isGettingInvestmentsInfo}
        />
        <LauncherControls
          isCanAddLiquidity={isCanAddLiquidity}
          projectData={projectData}
          isRegistration={isRegistration}
          isGettingInvestmentsInfo={isGettingInvestmentsInfo}
          isAddingLiquidity={isAddingLiquidity}
          onAddLiauidity={onAddLiauidity}
        />
      </Grid>
    </Box>
  );
};
