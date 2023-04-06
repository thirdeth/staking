import { createAction } from '@reduxjs/toolkit';
import { ApproveReq, RequestWithWeb3Provider, UpdateUserDataReq } from 'types/requests';

import actionTypes from './actionTypes';

export const approve = createAction<ApproveReq>(actionTypes.APPROVE);
export const getTokenBalance = createAction<RequestWithWeb3Provider>(actionTypes.GET_TOKEN_BALANCE);
export const getXTokenBalance = createAction<RequestWithWeb3Provider>(actionTypes.GET_XTOKEN_BALANCE);
export const getNativeBalance = createAction<RequestWithWeb3Provider>(actionTypes.GET_NATIVE_BALANCE);
export const getRankId = createAction<RequestWithWeb3Provider>(actionTypes.GET_RANK_ID);
export const updateUserData = createAction<UpdateUserDataReq>(actionTypes.UPDATE_USER_DATA);
