import stakingActionTypes from 'store/staking/actionTypes';
import userActionTypes from 'store/user/actionTypes';
import { UIState } from 'types';
import { RequestStatus } from 'types/store';

import { getUIReducer } from '.';

const initialState: UIState = {
  [userActionTypes.APPROVE]: RequestStatus.INIT,
  [stakingActionTypes.STAKE]: RequestStatus.INIT,
};

const uiReducer = getUIReducer(initialState);

export default uiReducer;
