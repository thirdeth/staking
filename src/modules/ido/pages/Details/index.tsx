import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Grid, Typography } from '@mui/material';
import { ApplyCard } from 'components';
import { useShallowSelector } from 'hooks';
import { isEmpty } from 'lodash';
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
import { IdoState, RequestStatus, State } from 'types';
import { IdoStatus } from 'types/store/requests';
import { getDisplayStageName } from 'utils';

import { IdoRequiredProps } from './Details.types';

export const Details: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();

  const {
    currentIdo,
    userInfo: { userAllocation },
    isLiqAdded,
  } = useShallowSelector<State, IdoState>(idoSelector.getIdo);
  const { idoIncrement, ownerAddress, vesting, status, tokenAddress, decimals } = currentIdo as IdoRequiredProps;
  const userAddress = useShallowSelector(userSelector.getProp('address'));

  // for refresh ido data
  useUpdateIdoData(currentIdo, id);
  const [isCanAddLiquidity, setCanAddLiquidity] = useState(false);

  const {
    [idoActionTypes.GET_IDO_BY_ID]: getIdoByIdRequestStatus,
    [idoActionTypes.ADD_LIQUIDITY]: addLiquidityRequestStatus,
    [idoActionTypes.REGISTRATION_TO_IDO]: registrationRequestStatus,
    [idoActionTypes.GET_INVESTMENTS_INFO]: getInvestmentsInfoRequestStatus,
  } = useShallowSelector(uiSelector.getUI);

  const isGettingIdoById = getIdoByIdRequestStatus === RequestStatus.REQUEST;
  const isRegistration = registrationRequestStatus === RequestStatus.REQUEST;
  const isAddingLiquidity = addLiquidityRequestStatus === RequestStatus.REQUEST;
  const isGettingInvestmentsInfo = getInvestmentsInfoRequestStatus === RequestStatus.REQUEST;

  const isDataLoaded = !isEmpty(currentIdo) && !isGettingIdoById;

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
    if (id && userAddress.length && !isEmpty(currentIdo)) {
      dispatch(
        getInvestmentsInfo({
          web3Provider: walletService.Web3(),
          idoId: id,
          idoIncrement: idoIncrement.toString(),
          vesting,
          ownerAddress,
        }),
      );
    }
  }, [currentIdo, dispatch, id, idoIncrement, ownerAddress, userAddress.length, vesting, walletService]);

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
        <Grid container justifyContent="space-between" alignItems="flex-start" spacing={3} sx={{ overflowX: 'hidden' }}>
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
              isCanAddLiquidity={isCanAddLiquidity}
              isRegistration={isRegistration}
              onAddLiauidity={handleAddLiquidity}
              isAddingLiquidity={isAddingLiquidity}
              isGettingInvestmentsInfo={isGettingInvestmentsInfo}
            />
          </Grid>
          <Grid item xs={12}>
            <TabsContent projectData={currentIdo as IdoRequiredProps} />
          </Grid>
          <Grid item xs={12}>
            <ApplyCard size="s" />
          </Grid>
        </Grid>
      )}

      {isGettingIdoById && <SkeletonContainer />}
    </>
  );
};
