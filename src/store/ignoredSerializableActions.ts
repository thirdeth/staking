import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import idoActionTypes from 'store/ido/actionTypes';
import stakingActionTypes from 'store/staking/actionTypes';
import userActionTypes from 'store/user/actionTypes';

export const ignoredActions = [
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  userActionTypes.GET_TOKEN_BALANCE,
  userActionTypes.GET_NATIVE_BALANCE,
  userActionTypes.GET_RANK_ID,
  userActionTypes.UPDATE_USER_DATA,
  userActionTypes.APPROVE,

  stakingActionTypes.STAKE,
  stakingActionTypes.HARVEST,
  stakingActionTypes.HARVEST_ALL,
  stakingActionTypes.WITHDRAW,
  stakingActionTypes.GET_USER_STAKES,
  stakingActionTypes.GET_POOLS_INFO,

  idoActionTypes.GET_USER_ALLOCATION,
  idoActionTypes.GET_IDO_LIST,
  idoActionTypes.GET_IDO_BY_ID,
  idoActionTypes.GET_INVESTMENTS_INFO,
  idoActionTypes.GET_TOTAL_BOUGHT,
  idoActionTypes.REGISTRATION_TO_IDO,
  idoActionTypes.INVEST,
  idoActionTypes.CLAIM,
  idoActionTypes.REFUND,
  idoActionTypes.ADD_LIQUIDITY,
];
