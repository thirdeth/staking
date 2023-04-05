import { createAction } from '@reduxjs/toolkit';
import {
  AddLiquidityReq,
  ClaimReq,
  GetAddLiquidityTimeReq,
  GetIdoByIdReq,
  GetIdoListReq,
  GetIvestmentsInfoReq,
  GetTotalBoughtReq,
  InvestReq,
  RegistrationIdoReq,
  RegistretionIdoWithUpdatesReq,
} from 'types/requests';

import actionTypes from './actionTypes';

export const getIdoList = createAction<GetIdoListReq>(actionTypes.GET_IDO_LIST);
export const getIdoById = createAction<GetIdoByIdReq>(actionTypes.GET_IDO_BY_ID);
export const getUserAllocation = createAction<RegistrationIdoReq>(actionTypes.GET_USER_ALLOCATION);
export const onRegistrationToIdo = createAction<RegistretionIdoWithUpdatesReq>(actionTypes.REGISTRATION_TO_IDO);
export const onInvest = createAction<InvestReq>(actionTypes.INVEST);
export const onClaim = createAction<ClaimReq>(actionTypes.CLAIM);
export const onRefund = createAction<ClaimReq>(actionTypes.REFUND);
export const onAddLiquidity = createAction<AddLiquidityReq>(actionTypes.ADD_LIQUIDITY);
export const getInvestmentsInfo = createAction<GetIvestmentsInfoReq>(actionTypes.GET_INVESTMENTS_INFO);
export const getTotalBought = createAction<GetTotalBoughtReq>(actionTypes.GET_TOTAL_BOUGHT);
export const getAddLiquidityTime = createAction<GetAddLiquidityTimeReq>(actionTypes.GET_ADD_LIQUIDITY_TIME);
