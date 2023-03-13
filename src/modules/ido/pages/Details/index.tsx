import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Grid, Typography } from '@mui/material';
import { useShallowSelector } from 'hooks';
import { isEmpty } from 'lodash';
import { AttentionText } from 'modules/ido/components';
import { LauncherCard, SkeletonContainer, TabsContent } from 'modules/ido/containers';
import { useUpdateIdoData } from 'modules/ido/hooks';
import { useWalletConnectorContext } from 'services';
import { getIdoById, getInvestmentsInfo, onAddLiquidity } from 'store/ido/actions';
import idoActionTypes from 'store/ido/actionTypes';
import { resetCurrentIdo } from 'store/ido/reducer';
import idoSelector from 'store/ido/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';
import { FontFamilies, FontWeights } from 'theme/Typography';
import { COLOR_TEXT_BLUE } from 'theme/variables';
import { IdoState, RequestStatus, State, UserState } from 'types';
import { IdoStatus } from 'types/store/requests';
import { getDisplayStageName, toDecimals } from 'utils';

import { IdoRequiredProps } from './Details.types';

export const Details: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();

  const {
    currentIdo,
    userInfo: { userAllocation, totalBought },
    isLiqAdded,
  } = useShallowSelector<State, IdoState>(idoSelector.getIdo);
  const { idoIncrement, ownerAddress, vesting, status, tokenAddress, softCap, decimals, end } =
    currentIdo as IdoRequiredProps;
  const { address: userAddress, rankId } = useShallowSelector<State, UserState>(userSelector.getUser);

  const isCurrentIdoEmpty = isEmpty(currentIdo);

  // for refresh ido data
  useUpdateIdoData(currentIdo as IdoRequiredProps, id);
  const [isCanAddLiquidity, setCanAddLiquidity] = useState(false);

  const {
    [idoActionTypes.GET_IDO_BY_ID]: getIdoByIdRequestStatus,
    [idoActionTypes.ADD_LIQUIDITY]: addLiquidityRequestStatus,
    [idoActionTypes.CLAIM]: claimRequestStatus,
    [idoActionTypes.REFUND]: refundRequestStatus,
    [idoActionTypes.REGISTRATION_TO_IDO]: registrationRequestStatus,
    [idoActionTypes.GET_INVESTMENTS_INFO]: getInvestmentsInfoRequestStatus,
  } = useShallowSelector(uiSelector.getUI);

  const isGettingIdoById = getIdoByIdRequestStatus === RequestStatus.REQUEST;
  const isRegistration = registrationRequestStatus === RequestStatus.REQUEST;
  const isClaiming = claimRequestStatus === RequestStatus.REQUEST;
  const isRefunding = refundRequestStatus === RequestStatus.REQUEST;
  const isAddingLiquidity = addLiquidityRequestStatus === RequestStatus.REQUEST;
  const isGettingInvestmentsInfo = getInvestmentsInfoRequestStatus === RequestStatus.REQUEST;

  const isDataLoaded = !isEmpty(currentIdo) && !isGettingIdoById;

  const isShowAttentionTextVisible =
    status === IdoStatus.completedFail && totalBought >= toDecimals(softCap, decimals) && +end * 1000 < Date.now();

  const handleAddLiquidity = () => {
    dispatch(
      onAddLiquidity({
        web3Provider: walletService.Web3(),
        idoIncrement: idoIncrement.toString(),
        tokenAddress,
        decimals,
      }),
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(getIdoById({ id }));
    }

    return () => {
      dispatch(resetCurrentIdo());
    };
  }, [dispatch, id, walletService]);

  useEffect(() => {
    if (id && userAddress.length && !isCurrentIdoEmpty) {
      dispatch(
        getInvestmentsInfo({
          web3Provider: walletService.Web3(),
          idoId: id,
          idoIncrement: idoIncrement.toString(),
          vesting,
        }),
      );
    }
  }, [isCurrentIdoEmpty, dispatch, id, idoIncrement, userAddress.length, vesting, walletService]);

  useEffect(() => {
    const isLoginAndDataLoaded = userAddress?.length && ownerAddress?.length;
    const isUserAdmin = userAddress?.toLowerCase() === ownerAddress?.toLowerCase();
    const isCompletedSuccess = status === IdoStatus.completedSuccess;
    // if user is owner IDO and liquidity is not added
    if (isLoginAndDataLoaded && isUserAdmin && !isLiqAdded && isCompletedSuccess) {
      setCanAddLiquidity(true);
    } else {
      setCanAddLiquidity(false);
    }
  }, [isLiqAdded, ownerAddress, status, userAddress]);

  return (
    <>
      {isDataLoaded && (
        <>
          {isShowAttentionTextVisible && <AttentionText />}

          <Grid
            container
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={3}
            sx={{ overflowX: 'hidden' }}
          >
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{
                  strong: {
                    fontSize: '30px',
                    fontFamily: FontFamilies.secondary,
                    fontWeight: FontWeights.fontWeightRegular,
                    textTransform: 'uppercase',
                    color: COLOR_TEXT_BLUE,
                  },
                }}
              >
                Status: <strong>{getDisplayStageName(status)}</strong>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <LauncherCard
                projectData={currentIdo as IdoRequiredProps}
                userAllocation={userAllocation}
                totalBought={totalBought}
                isCanAddLiquidity={isCanAddLiquidity}
                isRegistration={isRegistration}
                isClaiming={isClaiming}
                isRefunding={isRefunding}
                isAddingLiquidity={isAddingLiquidity}
                onAddLiauidity={handleAddLiquidity}
                isGettingInvestmentsInfo={isGettingInvestmentsInfo}
              />
            </Grid>
            <Grid item xs={12}>
              <TabsContent projectData={currentIdo as IdoRequiredProps} myRankId={rankId} />
            </Grid>
            <Grid item xs={12}>
              {/* <ApplyCard size="s" /> */}
            </Grid>
          </Grid>
        </>
      )}

      {isGettingIdoById && <SkeletonContainer />}
    </>
  );
};
