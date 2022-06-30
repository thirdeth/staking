import { createAction } from '@reduxjs/toolkit';
import { GetIdoListReq } from 'types/requests';

import actionTypes from './actionTypes';

export const getIdoList = createAction<GetIdoListReq>(actionTypes.GET_IDO_LIST);
