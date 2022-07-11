import { createAction } from '@reduxjs/toolkit';
import { GetIdoByIdReq, GetIdoListReq, GetIvestmentsInfoReq, InvestReq, RegistrationIdoReq } from 'types/requests';

import actionTypes from './actionTypes';

export const getIdoList = createAction<GetIdoListReq>(actionTypes.GET_IDO_LIST);
export const getIdoById = createAction<GetIdoByIdReq>(actionTypes.GET_IDO_BY_ID);
export const getUserAllocation = createAction<RegistrationIdoReq>(actionTypes.GET_USER_ALLOCATION);
export const onRegistrationToIdo = createAction<RegistrationIdoReq>(actionTypes.REGISTRATION_TO_IDO);
export const onInvest = createAction<InvestReq>(actionTypes.INVEST);
export const getInvestmentsInfo = createAction<GetIvestmentsInfoReq>(actionTypes.GET_INVESTMENTS_INFO);
