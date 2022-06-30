import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { LogoSmall, MainLogo } from 'components/Icon/components';
import { FontWeights } from 'theme/Typography';
import { BG_MAIN, BORDER_RADIUS_CARD_MEDIUM } from 'theme/variables';

import { LauncherCardProps } from '../../LauncherCard';

enum StageTextVariants {
  upcoming = 'Registration will start in',
  open = 'Registration closed. Sale Opens In',
  completed = 'Completed success',
}

export const LauncherInfo: FC<Pick<LauncherCardProps, 'progressData'>> = ({ progressData }) => {
  const { stage, saleEndTime } = progressData;
  return (
    <Grid container justifyContent="space-between" height={{ md: 'auto', lg: '102px' }}>
      <Grid
        item
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        flexWrap="nowrap"
        columnGap={3}
        xs={12}
        sm={12}
        md={5}
      >
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          p={1}
          sx={(theme) => ({
            height: '102px',
            width: '102px',
            background: BG_MAIN,
            borderRadius: BORDER_RADIUS_CARD_MEDIUM,
            [theme.breakpoints.down('md')]: {
              height: '75px',
              width: '75px',
            },
          })}
        >
          <MainLogo
            sx={{
              width: { xs: '54px', sm: '54px', md: '85px' },
              height: { xs: '60px', sm: '60px', md: '86px' },
            }}
          />
        </Grid>

        <Grid item container direction="column" justifyContent="space-between" sx={{ height: '100%' }}>
          <Typography variant="h1" textTransform="uppercase" sx={{ fontSize: { xs: '20px', sm: '20px', md: '30px' } }}>
            Cronos Launcher
          </Typography>
          <Typography variant="body2" textTransform="uppercase" fontWeight={FontWeights.fontWeightRegular}>
            price (CLZ) = 0.13 CRO
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        container
        justifyContent={{ xs: 'flex-start', sm: 'flex-start', md: 'center' }}
        alignItems="center"
        mt={{ xs: 4, sm: 4 }}
        mb={{ xs: 2, sm: 2 }}
        xs={2}
        sm={2}
        md={2}
      >
        <Box sx={{ width: '52px', height: '52px', background: BG_MAIN, borderRadius: '50%' }}>
          <Grid container justifyContent="center" alignItems="center" height="100%">
            <LogoSmall sx={{ width: '40px', height: '45px' }} />
          </Grid>
        </Box>
      </Grid>

      <Grid
        item
        container
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        xs={12}
        sm={12}
        md={5}
      >
        <Typography variant="body2" textTransform="uppercase" fontWeight={FontWeights.fontWeightRegular}>
          {StageTextVariants[stage]}
        </Typography>
        {stage !== 'completed' && (
          <Typography variant="h1" textTransform="uppercase">
            {saleEndTime}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};
