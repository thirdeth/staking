import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { ProgressBar } from 'components';

import { LauncherCardProps } from '../../LauncherCard';

export const LauncherProgress: FC<Pick<LauncherCardProps, 'progressData'>> = ({ progressData }) => {
  const { progress, totalRaise, allocation, targetRaise } = progressData;
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
            Total Raise:
          </Typography>
          <Typography variant="body2" fontWeight={700}>
            {totalRaise} BUSD (86%)
          </Typography>
        </Grid>

        <Grid
          item
          container
          justifyContent={{ xs: 'flex-start', sm: 'flex-start', md: 'space-between' }}
          xs={12}
          sm={12}
          md={7}
        >
          <Grid item container direction={{ xs: 'column', sm: 'column', md: 'row' }} xs={6}>
            <Typography variant="body2" fontWeight={700}>
              Allocation:
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {allocation} BUSD MAX
            </Typography>
          </Grid>

          <Grid
            item
            container
            justifyContent={{ xs: 'space-between', sm: 'space-between', md: 'flex-end' }}
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            xs={6}
          >
            <Typography variant="body2" fontWeight={700}>
              Target Raise:
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {targetRaise} BUSD
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <ProgressBar variant="parallelogram" progress={progress} />
      </Grid>
    </Grid>
  );
};