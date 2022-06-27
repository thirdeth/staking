import { FC } from 'react';
import { Grid } from '@mui/material';
import { ApplyCard, RowCard } from 'components';

import { leaderboardItemsMock } from './Leaderboard.helpers';

export const Leaderboard: FC = () => {
  return (
    <>
      <Grid pt={2} container spacing={2}>
        <Grid item xs={12} display={{ xs: 'none', sm: 'none', md: 'block' }}>
          {/* <CardsHeader /> */}
        </Grid>

        {leaderboardItemsMock.map((cardData) => (
          <Grid key={cardData.id} item xs={12}>
            <RowCard variant="rank" cardData={cardData} />
          </Grid>
        ))}
      </Grid>
      <ApplyCard size="s" />
    </>
  );
};
