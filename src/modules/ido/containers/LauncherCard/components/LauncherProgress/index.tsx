import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { ProgressBar } from 'components';
import { getTooltipWithLoading } from 'modules/ido/utils';
import { fromDecimals } from 'utils';

import { LauncherCardProps } from '../../LauncherCard';

type LauncherProgressProps = Pick<LauncherCardProps, 'projectData' | 'userAllocation' | 'isGettingInvestmentsInfo'>;

export const LauncherProgress: FC<LauncherProgressProps> = ({
  projectData,
  userAllocation,
  isGettingInvestmentsInfo,
}) => {
  const { totalBought, hardCap, decimals, tokenSymbol } = projectData;

  return (
    <Grid container alignItems="center" rowGap={2} pt={{ xs: 2, sm: 2, md: 4 }}>
      <Grid item container xs={12}>
        <Grid
          item
          container
          justifyContent="flex-start"
          alignItems={{ md: 'center', lg: 'center' }}
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          pt={{ xs: 4, sm: 4, md: 0 }}
          pb={{ xs: 2, sm: 2, md: 0 }}
          xs={12}
          sm={12}
          md={5}
        >
          <Typography variant="body2" fontWeight={700}>
            Total Raise:&nbsp;
          </Typography>

          {getTooltipWithLoading(isGettingInvestmentsInfo, fromDecimals(totalBought, decimals), tokenSymbol)}
        </Grid>

        <Grid
          item
          container
          justifyContent={{ xs: 'flex-start', sm: 'flex-start', md: 'space-between' }}
          alignItems="center"
          xs={12}
          sm={12}
          md={7}
        >
          {userAllocation && (
            <Grid item container alignItems="center" direction={{ xs: 'column', sm: 'column', md: 'row' }} xs={6}>
              <Typography variant="body2" fontWeight={700}>
                Allocation:&nbsp;
              </Typography>
              {getTooltipWithLoading(isGettingInvestmentsInfo, userAllocation, tokenSymbol)}
            </Grid>
          )}

          <Grid
            item
            container
            justifyContent={{ xs: 'space-between', sm: 'space-between', md: 'flex-end' }}
            alignItems="center"
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            xs={userAllocation ? 6 : 12}
          >
            <Typography variant="body2" fontWeight={700}>
              Target Raise:&nbsp;
            </Typography>
            {getTooltipWithLoading(isGettingInvestmentsInfo, hardCap, tokenSymbol)}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <ProgressBar variant="parallelogram" progress={+fromDecimals(totalBought)} base={+hardCap} />
      </Grid>
    </Grid>
  );
};
