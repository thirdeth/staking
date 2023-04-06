import { FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Typography } from '@mui/material';
import { routes } from 'appConstants/routes';
import BigNumber from 'bignumber.js/bignumber';
import { InfoCard, RowCard, UserStakingRankIds } from 'components';
import { RowCardSkeleton } from 'components/Cards/RowCard/components';
import { useShallowSelector, useValidateInputField, ValidationTypes } from 'hooks';
import { RankingInfoCard } from 'modules/ranking/components/RankingInfoCard';
import { ChartCard, StakesCardsHeader } from 'modules/staking/components';
import { StakingForm, VaultForm, VaultWithdraw } from 'modules/staking/containers';
import { useGetPoolsAprArray } from 'modules/staking/hooks';
import { useWalletConnectorContext } from 'services';
import { setActiveModal } from 'store/modals/reducer';
import { getPoolsInfo, getTvlAndApr, onHarvest, onHarvestAll, onStake, onWithdraw } from 'store/staking/actions';
import stakingActionTypes from 'store/staking/actionTypes';
import stakingSelector from 'store/staking/selectors';
import uiSelector from 'store/ui/selectors';
import { updateUserData } from 'store/user/actions';
import userSelector from 'store/user/selectors';
import { Modals, RequestStatus, StakingState, State, UserState } from 'types';

import { chartItemsArray } from './Staking.helpers';
import { ChangeStakeItemType } from './Staking.types';

interface StakingProps {
  title: string;
}

export const Staking: FC<StakingProps> = ({ title }) => {
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();
  const { address, tokenBalance, xtokenBalance, rankId } = useShallowSelector<State, UserState>(userSelector.getUser);
  const { userStakes, totalStakedAmount, poolsInfo, apr, tvl, numberOfStakers } = useShallowSelector<
    State,
    StakingState
  >(stakingSelector.getStaking);

  const [stakePeriod, setStakePeriod] = useState(1);
  const [stakeValue, setStakeValue, setOriginStakeValue] = useValidateInputField(ValidationTypes.number);
  const [depositValue, setDepositValue, setOriginDepositValue] = useValidateInputField(ValidationTypes.number);
  const poolsAprArr = useGetPoolsAprArray(poolsInfo);

  const {
    [stakingActionTypes.STAKE]: stakeRequestStatus,
    [stakingActionTypes.HARVEST]: harvestRequestStatus,
    [stakingActionTypes.HARVEST_ALL]: harvestAllRequestStatus,
    [stakingActionTypes.WITHDRAW]: withdrawRequestStatus,
    [stakingActionTypes.GET_USER_STAKES]: getUserStakesRequestStatus,
  } = useShallowSelector(uiSelector.getUI);

  const isStaking = stakeRequestStatus === RequestStatus.REQUEST;
  const isHarvesting = harvestRequestStatus === RequestStatus.REQUEST;
  const isHarvestingAll = harvestAllRequestStatus === RequestStatus.REQUEST;
  const isWithdrawing = withdrawRequestStatus === RequestStatus.REQUEST;
  const isGettingUserStakes = getUserStakesRequestStatus === RequestStatus.REQUEST;

  const getChartValue = (label: string) => {
    switch (label) {
      case 'tvl':
        return `${new BigNumber(tvl).toFixed(2)} ARSH`;
      case 'apr':
        return `${new BigNumber(apr).toFixed(0)} %`;
      case 'numberOfStakers':
        return numberOfStakers;
      default:
        return tvl;
    }
  };

  const handleCahngeStakePeriod = useCallback((event: MouseEvent<HTMLElement>) => {
    const { value } = event.target as HTMLButtonElement;
    if (value !== undefined) {
      setStakePeriod(+value);
    }
  }, []);

  const handleOpenConnectModal = useCallback(() => {
    dispatch(
      setActiveModal({
        activeModal: Modals.ConnectWallet,
        open: true,
      }),
    );
  }, [dispatch]);

  const handleStake = useCallback(() => {
    dispatch(
      onStake({
        web3Provider: walletService.Web3(),
        amount: stakeValue,
        poolId: stakePeriod,
      }),
    );
  }, [dispatch, stakePeriod, stakeValue, walletService]);

  const handleHarvestAll = useCallback(() => {
    dispatch(
      onHarvestAll({
        web3Provider: walletService.Web3(),
      }),
    );
  }, [dispatch, walletService]);

  const handleChangeStakeItem = useCallback(
    (changeType: ChangeStakeItemType, stakeIndex: number) => {
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
    },
    [dispatch, walletService],
  );

  useEffect(() => {
    if (stakeRequestStatus === RequestStatus.SUCCESS) {
      setOriginStakeValue('');
      dispatch(getTvlAndApr());
    }
  }, [dispatch, setOriginStakeValue, stakeRequestStatus]);
  useEffect(() => {
    if (harvestAllRequestStatus === RequestStatus.SUCCESS) {
      dispatch(getTvlAndApr());
    }
  }, [dispatch, harvestAllRequestStatus]);

  useEffect(() => {
    if (address.length) {
      dispatch(getPoolsInfo({ web3Provider: walletService.Web3() }));
      dispatch(updateUserData({ web3Provider: walletService.Web3(), updateParams: ['userStakes'] }));
    }
  }, [address.length, dispatch, walletService]);

  useEffect(() => {
    dispatch(getTvlAndApr());
  }, [dispatch]);

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {!!address.length && (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h1" textTransform="uppercase">
              {title}
            </Typography>
            {/* <Link to={routes.staking.leaderboard.root.path}> */}
            {/*  <Button>Leaderboard</Button> */}
            {/* </Link> */}
          </Box>

          {
            +rankId !== 0 && null
            // <RankingInfoCard
            //   rankId={+rankId as UserStakingRankIds}
            //   description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            //   my={3}
            // />
          }

          <Grid
            container
            pt={2}
            justifyContent={{ xs: 'center', sm: 'center', md: 'center', lg: 'space-between' }}
            alignItems="flex-start"
            rowSpacing={3}
          >
            <Grid item xs={12} container spacing={3} height={{ xs: 'auto', sm: 'auto', md: 555 }}>
              <Grid item xs={12} sm={12} md={6} height={{ xs: 'auto', sm: 'auto', md: '100%' }}>
                <StakingForm
                  totalStakedAmount={totalStakedAmount}
                  tokenBalance={tokenBalance}
                  poolsInfo={poolsInfo}
                  poolsAprArr={poolsAprArr}
                  stakePeriod={stakePeriod}
                  stakeValue={stakeValue}
                  isStaking={isStaking}
                  onChangeStakePeriod={handleCahngeStakePeriod}
                  onChangeStakeValue={setStakeValue}
                  onSetMaxStakeValue={setOriginStakeValue}
                  onStake={handleStake}
                />
              </Grid>

              <Grid
                item
                container
                direction="column"
                justifyContent="space-between"
                height={{ xs: 'auto', sm: 'auto', md: '100%' }}
                rowGap={{ xs: 3, sm: 3, md: 0 }}
                xs={12}
                sm={12}
                md={6}
              >
                {chartItemsArray.map(({ label, text, Img }, index) => (
                  // not rerendering chart card items
                  // eslint-disable-next-line react/no-array-index-key
                  <Grid key={index} item>
                    <ChartCard value={getChartValue(label)} text={text} chartImg={<Img />} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item mt={2} xs={12} container spacing={2}>
              <Grid item xs={12}>
                {!!userStakes.length && (
                  <StakesCardsHeader onHarvestAll={handleHarvestAll} isHarvestingAll={isHarvestingAll} />
                )}
              </Grid>

              <Grid
                item
                container
                justifyContent="center"
                xs={12}
                display={{ xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }}
              >
                <LoadingButton
                  variant="contained"
                  sx={{ width: { xs: '100%', sm: 310, md: 310 } }}
                  loading={isHarvestingAll}
                  onClick={handleHarvestAll}
                >
                  Harvest All
                </LoadingButton>
              </Grid>

              {!!userStakes.length &&
                !isGettingUserStakes &&
                userStakes.map((cardData, index) => (
                  // not rerendering items
                  // eslint-disable-next-line react/no-array-index-key
                  <Grid key={index} item xs={12}>
                    <RowCard
                      cardData={{ stakesData: cardData, id: index }}
                      variant="stakes"
                      poolsAprArr={poolsAprArr}
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

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h1" textTransform="uppercase">
              Vault
            </Typography>
          </Box>

          <Grid
            container
            pt={2}
            justifyContent={{ xs: 'center', sm: 'center', md: 'center', lg: 'space-between' }}
            alignItems="flex-start"
            rowSpacing={3}
          >
            <Grid item xs={12} container spacing={3} height={{ xs: 'auto', sm: 'auto', md: 'auto' }}>
              <Grid item xs={12} sm={12} md={6} height={{ xs: 'auto', sm: 'auto', md: 'auto' }}>
                <VaultForm
                  tokenBalance={xtokenBalance}
                  depositValue={depositValue}
                  isDepositing={isStaking}
                  onChangeDepositValue={setDepositValue}
                  onSetMaxDepositValue={setOriginDepositValue}
                  onDeposit={handleStake}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} height={{ xs: 'auto', sm: 'auto', md: 'auto' }}>
                <VaultWithdraw
                  lockedAmount={tokenBalance}
                  unlockedAmount={tokenBalance}
                  isWithdrawing={isStaking}
                  onWithdraw={handleStake}
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      {!address.length && (
        <InfoCard
          title="Looks like you haven’t staked yet… But first you need to connect your wallet"
          buttonText="Connect Wallet"
          onClick={handleOpenConnectModal}
        />
      )}

      {/* <ApplyCard size="s" /> */}
    </Box>
  );
};
