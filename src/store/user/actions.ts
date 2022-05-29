import { createAction } from '@reduxjs/toolkit';
import { ApproveReq } from 'types/requests';

import actionTypes from './actionTypes';

export const approve = createAction<ApproveReq>(actionTypes.APPROVE);
