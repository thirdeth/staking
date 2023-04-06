import { createAction } from '@reduxjs/toolkit';
import { DepositReq, RequestWithWeb3Provider } from 'types/requests';

import actionTypes from './actionTypes';

export const onDeposit = createAction<DepositReq>(actionTypes.DEPOSIT);
export const onClaim = createAction<RequestWithWeb3Provider>(actionTypes.CLAIM);
export const getUserLockedAmount = createAction<RequestWithWeb3Provider>(actionTypes.GET_USER_LOCKED_AMOUNT);
export const getUserUnlockedAmount = createAction<RequestWithWeb3Provider>(actionTypes.GET_USER_UNLOCKED_AMOUNT);
