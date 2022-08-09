import { createAction } from '@reduxjs/toolkit';
import { ChangeUserStakeItemReq, RequestWithWeb3Provider, StakeReq } from 'types/requests';

import actionTypes from './actionTypes';

export const onStake = createAction<StakeReq>(actionTypes.STAKE);
export const onHarvest = createAction<ChangeUserStakeItemReq>(actionTypes.HARVEST);
export const onHarvestAll = createAction<RequestWithWeb3Provider>(actionTypes.HARVEST_ALL);
export const onWithdraw = createAction<ChangeUserStakeItemReq>(actionTypes.WITHDRAW);
export const getUserStakes = createAction<RequestWithWeb3Provider>(actionTypes.GET_USER_STAKES);
export const getPoolsInfo = createAction<RequestWithWeb3Provider>(actionTypes.GET_POOLS_INFO);
export const getTopInvestors = createAction(actionTypes.GET_TOP_INVESTORS);
