import { FC } from 'react';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { Countdown } from 'components';
import { ProjectDataProps } from 'modules/ido/pages/Details/Details.types';
import { FontWeights } from 'theme/Typography';
import { BG_MAIN, BORDER_RADIUS_CARD_MEDIUM, BORDER_RADIUS_DEFAULT } from 'theme/variables';
import { IdoStatus } from 'types/store/requests';

import { statusTextVariants } from '../../LauncherCard.helpers';

export const LauncherInfo: FC<ProjectDataProps> = ({ projectData }) => {
  const { type, status, projectName, logoUrl, tokenSymbol, price, tokenLogoUrl, timer } = projectData;

  return (
    <Grid container justifyContent="space-between" height={{ md: 'auto', lg: '102px' }}>
      <Grid item container justifyContent="flex-start" alignItems="flex-start" flexWrap="nowrap" xs={12} sm={12} md={5}>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          p={1}
          mr={{ xs: 1, sm: 1, md: 3 }}
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
          <Box
            component="img"
            src={logoUrl}
            alt="project logo"
            sx={{
              width: { xs: '54px', sm: '54px', md: '86px' },
              height: { xs: '60px', sm: '60px', md: '86px' },
              borderRadius: BORDER_RADIUS_DEFAULT,
            }}
          />
        </Grid>

        <Grid item container direction="column" justifyContent="space-between" sx={{ height: '100%' }}>
          <Tooltip title={projectName} arrow placement="bottom-start">
            <Typography
              variant="h1"
              textTransform="uppercase"
              noWrap
              maxWidth={{ xs: 150, sm: 150, md: 350 }}
              fontSize={{ xs: '20px', sm: '20px', md: '30px' }}
            >
              {projectName}
            </Typography>
          </Tooltip>
          <Typography variant="body2" textTransform="uppercase" fontWeight={FontWeights.fontWeightRegular}>
            price ({tokenSymbol}) = {price} CRO
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
        <Box
          sx={{
            width: '52px',
            height: '52px',
            background: BG_MAIN,
            borderRadius: '50%',
          }}
        >
          <Grid container justifyContent="center" alignItems="center" height="100%">
            <Box
              component="img"
              src={tokenLogoUrl}
              alt="token logo"
              sx={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
              }}
            />
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
          {type !== 'public_staking' && status === IdoStatus.pending
            ? 'Sale will start in'
            : statusTextVariants[status as IdoStatus]}
        </Typography>
        {status !== IdoStatus.completedFail && status !== IdoStatus.completedSuccess && (
          <Countdown auctionEndText="00d 00h 00m 00s" timer={+timer} />
        )}
      </Grid>
    </Grid>
  );
};
