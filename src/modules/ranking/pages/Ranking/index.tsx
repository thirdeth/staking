import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { UserStakingRankIds } from 'components';
import { useShallowSelector } from 'hooks';
import { RankingCard } from 'modules/ranking/components';
import { RankingInfoCard } from 'modules/ranking/components/RankingInfoCard';
import userSelector from 'store/user/selectors';

import { rankingCardsInfo } from './Ranking.helper';

export const Ranking: FC = () => {
  const rankId = useShallowSelector(userSelector.getProp('rankId'));
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Typography paddingBottom={4} variant="h1">
        Ranking
      </Typography>
      <RankingInfoCard
        rankId={+rankId as UserStakingRankIds}
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      />
      <Grid container spacing={3} paddingTop={9}>
        {rankingCardsInfo.map((rankInfo) => {
          return (
            <Grid item xs={12} sm={12} md={6} lg={4} key={rankInfo.rankId}>
              <RankingCard {...rankInfo} rankId={rankInfo.rankId as UserStakingRankIds} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
