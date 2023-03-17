import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { ProjectDataProps } from 'modules/ido/pages/Details/Details.types';
import { BG_GRAY, BORDER_RADIUS_DEFAULT } from 'theme/variables';
import { Nullable } from 'types';

import { LauncherControls, LauncherInfo, LauncherProgress } from './components';

export type LauncherCardProps = {
  userAddress: string;
  userAllocation: Nullable<string>;
  totalBought: string;
  isCanAddLiquidity: boolean;
  isRegistration: boolean;
  isClaiming: boolean;
  isRefunding: boolean;
  isAddingLiquidity: boolean;
  isGettingInvestmentsInfo: boolean;
  onAddLiquidity: () => void;
} & ProjectDataProps;

export const LauncherCard: FC<LauncherCardProps> = ({
  userAddress,
  projectData,
  isCanAddLiquidity,
  userAllocation,
  totalBought,
  isRegistration,
  isClaiming,
  isRefunding,
  isAddingLiquidity,
  isGettingInvestmentsInfo,
  onAddLiquidity,
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
          projectData={{ ...projectData, totalBought }}
          userAllocation={userAllocation}
          isGettingInvestmentsInfo={isGettingInvestmentsInfo}
        />
        <LauncherControls
          userAddress={userAddress}
          isCanAddLiquidity={isCanAddLiquidity}
          projectData={projectData}
          isRegistration={isRegistration}
          isClaiming={isClaiming}
          isAddingLiquidity={isAddingLiquidity}
          isRefunding={isRefunding}
          isGettingInvestmentsInfo={isGettingInvestmentsInfo}
          onAddLiquidity={onAddLiquidity}
          userAllocation={userAllocation}
        />
      </Grid>
    </Box>
  );
};
