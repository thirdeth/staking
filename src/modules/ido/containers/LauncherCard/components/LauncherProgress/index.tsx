import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { ProgressBar, TextWithTooltip } from 'components';
import { fromDecimals } from 'utils';

import { LauncherCardProps } from '../../LauncherCard';

type LauncherProgressProps = Pick<LauncherCardProps, 'projectData' | 'userAllocation' | 'isGettingInvestmentsInfo'>;

export const LauncherProgress: FC<LauncherProgressProps> = ({
  projectData,
  userAllocation,
  isGettingInvestmentsInfo,
}) => {
  const { totalBought, softCap, hardCap, decimals, tokenSymbol } = projectData;

  return (
    <Box pt={{ xs: 2, sm: 2, md: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center" mb={1}>
        <Grid item xs={12} sm={12} md={4}>
          <TextWithTooltip
            value={fromDecimals(totalBought, decimals)}
            startText="Total Raise:"
            endText={tokenSymbol.toUpperCase()}
            isLoading={isGettingInvestmentsInfo}
            fontSize={16}
            fontWeight={700}
          />
        </Grid>

        <Grid
          item
          container
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          justifyContent="center"
          flexWrap="nowrap"
          columnSpacing={2}
          xs={12}
          sm={12}
          md={4}
        >
          {userAllocation && (
            <Grid item xs={6}>
              <TextWithTooltip
                value={userAllocation}
                startText="Allocation:"
                endText={tokenSymbol.toUpperCase()}
                isLoading={isGettingInvestmentsInfo}
                fontSize={16}
                fontWeight={700}
              />
            </Grid>
          )}

          <Grid
            item
            container
            justifyContent={{ xs: 'flex-start', sm: 'flex-start', md: 'center' }}
            xs={userAllocation ? 6 : 12}
          >
            <TextWithTooltip
              value={softCap}
              startText="SoftCap:"
              endText={tokenSymbol.toUpperCase()}
              isLoading={isGettingInvestmentsInfo}
              fontSize={16}
              fontWeight={700}
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          justifyContent={{ xs: 'flex-start', sm: 'flex-start', md: 'flex-end' }}
          xs={12}
          sm={12}
          md={4}
        >
          <TextWithTooltip
            value={hardCap}
            startText="Target Raise:"
            endText={tokenSymbol.toUpperCase()}
            isLoading={isGettingInvestmentsInfo}
            fontSize={16}
            fontWeight={700}
          />
        </Grid>
      </Grid>

      <ProgressBar variant="parallelogram" progress={+fromDecimals(totalBought)} base={+hardCap} />
    </Box>
  );
};
