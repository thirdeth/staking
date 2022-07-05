import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import { ApplyCard, RowCard } from 'components';
import { RowCardSkeleton } from 'components/Cards/RowCard/components';
import { useShallowSelector } from 'hooks';
import { CardsHeader } from 'modules/staking/components';
import { useUpdateDataForLeaderBoards } from 'modules/staking/hooks';
import { getTopInvestors } from 'store/staking/actions';
import stakeActionTypes from 'store/staking/actionTypes';
import uiSelector from 'store/ui/selectors';
import { RequestStatus } from 'types';

export const Leaderboard: FC = () => {
  const dispatch = useDispatch();

  const leaderboardItems = useUpdateDataForLeaderBoards();

  const getLeaderBoardsRequestStatus = useShallowSelector(uiSelector.getProp(stakeActionTypes.GET_TOP_INVESTORS));

  useEffect(() => {
    dispatch(getTopInvestors());
  }, [dispatch]);
  return (
    <>
      <Grid pt={2} container spacing={2}>
        <Grid item xs={12} display={{ xs: 'none', sm: 'none', md: 'block' }}>
          <CardsHeader />
        </Grid>
        {getLeaderBoardsRequestStatus === RequestStatus.REQUEST
          ? new Array(10).fill('').map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid key={index} item xs={12}>
                <RowCardSkeleton />
              </Grid>
            ))
          : leaderboardItems.map((cardData) => (
              <Grid key={cardData.id} item xs={12}>
                <RowCard variant="rank" cardData={cardData} />
              </Grid>
            ))}
      </Grid>
      <ApplyCard size="s" />
    </>
  );
};
