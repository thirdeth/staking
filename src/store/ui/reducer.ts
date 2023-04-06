import idoActionTypes from 'store/ido/actionTypes';
import stakingActionTypes from 'store/staking/actionTypes';
import userActionTypes from 'store/user/actionTypes';
import vaultActionTypes from 'store/vault/actionTypes';
import { UIState } from 'types';
import { RequestStatus } from 'types/store';

import { getUIReducer } from '.';

const initialState: UIState = {
  [userActionTypes.APPROVE]: RequestStatus.INIT,
  [stakingActionTypes.STAKE]: RequestStatus.INIT,
  [stakingActionTypes.GET_TOP_INVESTORS]: RequestStatus.INIT,
  [vaultActionTypes.DEPOSIT]: RequestStatus.INIT,
  [idoActionTypes.GET_IDO_LIST]: RequestStatus.INIT,
};

const uiReducer = getUIReducer(initialState);

export default uiReducer;
