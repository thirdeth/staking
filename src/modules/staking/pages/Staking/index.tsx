import { FC, MouseEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { routes } from 'appConstants/routes';
import { ApplyCard, RowCard } from 'components';
import { RowCardSkeleton } from 'components/Cards/RowCard/components';
import { useShallowSelector, useValidateInputField, ValidationTypes } from 'hooks';
import { ChartCard, StakesCardsHeader } from 'modules/staking/components';
import { StakingForm } from 'modules/staking/containers';
import { useWalletConnectorContext } from 'services';
import { getUserStakes, onHarvest, onStake, onWithdraw } from 'store/staking/actions';
import stakingActionTypes from 'store/staking/actionTypes';
import stakingSelector from 'store/staking/selectors';
import uiSelector from 'store/ui/selectors';
import { getTokenBalance } from 'store/user/actions';
import userSelector from 'store/user/selectors';
import { RequestStatus, StakingState, State, UserState } from 'types';

import { chartItemsArray } from './Staking.helpers';
import { ChangeStakeItemType } from './Staking.types';

interface StakingProps {
  title: string;
}

export const Staking: FC<StakingProps> = ({ title }) => {
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();
  const { address, tokenBalance } = useShallowSelector<State, UserState>(userSelector.getUser);
  const { userStakes, totalStakedAmount } = useShallowSelector<State, StakingState>(stakingSelector.getStaking);

  const [stakePeriod, setStakePeriod] = useState(1);
  const [stakeValue, setStakeValue, setOriginStakeValue] = useValidateInputField(ValidationTypes.number);

  const {
    [stakingActionTypes.STAKE]: stakeRequestStatus,
    [stakingActionTypes.HARVEST]: harvestRequestStatus,
    [stakingActionTypes.WITHDRAW]: withdrawRequestStatus,
    [stakingActionTypes.GET_USER_STAKES]: getUserStakesRequestStatus,
  } = useShallowSelector(uiSelector.getUI);

  const isStaking = stakeRequestStatus === RequestStatus.REQUEST;
  const isHarvesting = harvestRequestStatus === RequestStatus.REQUEST;
  const isWithdrawing = withdrawRequestStatus === RequestStatus.REQUEST;
  const isGettingUserStakes = getUserStakesRequestStatus === RequestStatus.REQUEST;

  const handleCahngeStakePeriod = (event: MouseEvent<HTMLElement>) => {
    const { value } = event.target as HTMLButtonElement;
    setStakePeriod(+value);
  };

  const handleStake = () => {
    dispatch(
      onStake({
        web3Provider: walletService.Web3(),
        amount: stakeValue,
        poolId: stakePeriod,
      }),
    );
  };

  const handleChangeStakeItem = (changeType: ChangeStakeItemType, stakeIndex: number) => {
    if (changeType === 'harvest') {
      dispatch(
        onHarvest({
          web3Provider: walletService.Web3(),
          stakeIndex,
        }),
      );
    }
    if (changeType === 'withdraw') {
      dispatch(
        onWithdraw({
          web3Provider: walletService.Web3(),
          stakeIndex,
        }),
      );
    }
  };

  useEffect(() => {
    if (address.length) {
      dispatch(getTokenBalance({ web3Provider: walletService.Web3() }));
      dispatch(getUserStakes({ web3Provider: walletService.Web3() }));
    }
  }, [address.length, dispatch, walletService]);

  useEffect(() => {
    if (stakeRequestStatus === RequestStatus.SUCCESS) {
      setOriginStakeValue('');
    }
  }, [setOriginStakeValue, stakeRequestStatus]);

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h1">{title}</Typography>
        <Link to={routes.staking.leaderboard.root.path}>
          <Button>Leaderboard</Button>
        </Link>
      </Box>

      <Grid
        container
        pt={5.1}
        justifyContent={{ xs: 'center', sm: 'center', md: 'center', lg: 'space-between' }}
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={12} sm={12} md={6}>
          <StakingForm
            totalStakedAmount={totalStakedAmount}
            tokenBalance={tokenBalance}
            stakePeriod={stakePeriod}
            stakeValue={stakeValue}
            isStaking={isStaking}
            onChangeStakePeriod={handleCahngeStakePeriod}
            onChangeStakeValue={setStakeValue}
            onSetMaxStakeValue={setOriginStakeValue}
            onStake={handleStake}
          />
        </Grid>

        <Grid item container spacing={1} direction="column" xs={12} sm={12} md={6}>
          {chartItemsArray.map(({ value, text, Img }, index) => (
            // not rerendering chart card items
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={index} item>
              <ChartCard value={value} text={text} chartImg={<Img />} />
            </Grid>
          ))}
        </Grid>

        <Grid item mt={2} xs={12} container spacing={2}>
          <Grid item xs={12}>
            {!!userStakes.length && <StakesCardsHeader />}
          </Grid>

          {userStakes.length &&
            !isGettingUserStakes &&
            userStakes.map((cardData, index) => (
              // not rerendering items
              // eslint-disable-next-line react/no-array-index-key
              <Grid key={index} item xs={12}>
                <RowCard
                  cardData={{ stakesData: cardData, id: index }}
                  variant="stakes"
                  isHarvesting={isHarvesting}
                  isWithdrawing={isWithdrawing}
                  onChangeStakeItem={handleChangeStakeItem}
                />
              </Grid>
            ))}

          {isGettingUserStakes &&
            new Array(6).fill('').map((_, index) => (
              // not important if will rerender
              // eslint-disable-next-line react/no-array-index-key
              <Grid key={index} item xs={12}>
                <RowCardSkeleton variant="stakes" />
              </Grid>
            ))}
        </Grid>
      </Grid>
      <ApplyCard size="s" />
    </Box>
  );
};
