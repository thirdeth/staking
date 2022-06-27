import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { RankIcon } from 'components/Icon/components';
import { COLOR_TEXT_WHITE } from 'theme/variables';

import { rankColors } from './Rank.helpers';
import { UserStakingRankIds } from './Rank.types';

export interface RankInfoProps {
  rankId?: UserStakingRankIds;
  isCard?: boolean;
}

export const RankInfo: FC<RankInfoProps> = ({ rankId = 1, isCard = false }) => {
  const currentRank = rankColors.find(({ id }) => id === rankId);

  return (
    <Grid container justifyContent="space-between" alignItems="center" columnSpacing={1}>
      <Grid item>
        <RankIcon
          sx={{
            width: isCard ? 70 : 35,
            height: isCard ? 80 : 40,
          }}
          stopColorOne={currentRank?.stopColorOne}
          stopColorTwo={currentRank?.stopColorTwo}
        />
      </Grid>
      {!isCard && (
        <Grid item container direction="column" justifyContent="flex-start" alignItems="flex-start" rowSpacing={1}>
          <Typography variant="subtitle1" color={COLOR_TEXT_WHITE}>
            Correct Rank
          </Typography>
          <Typography variant="h4" color={COLOR_TEXT_WHITE}>
            {currentRank?.title}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
