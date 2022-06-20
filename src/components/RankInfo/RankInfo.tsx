import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { RankIcon } from 'components/Icon/components';
import { COLOR_TEXT_WHITE } from 'theme/variables';

import { rankColors } from './Rank.helpers';
import { RankNumberProps } from './Rank.types';

export interface RankInfoProps {
  rank?: RankNumberProps;
}

export const RankInfo: FC<RankInfoProps> = ({ rank = 1 }) => {
  const currentRank = rankColors.find(({ id }) => id === rank);
  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center" columnSpacing={1}>
        <Grid item>
          <RankIcon
            sx={{
              width: '35px',
              height: '40px',
            }}
            stopColorOne={currentRank?.stopColorOne}
            stopColorTwo={currentRank?.stopColorTwo}
          />
        </Grid>
        <Grid item container direction="column" justifyContent="flex-start" alignItems="flex-start" rowSpacing={1}>
          <Typography variant="subtitle1" color={COLOR_TEXT_WHITE}>
            Correct Rank
          </Typography>
          <Typography variant="h4" color={COLOR_TEXT_WHITE}>
            {currentRank?.title}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
