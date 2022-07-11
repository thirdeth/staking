import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import idoActionTypes from './ido/actionTypes';
import stakingActionTypes from './staking/actionTypes';
import userActionTypes from './user/actionTypes';
import reducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['provider', 'key', 'id'],
};

const reducers = {
  ...reducer,
  user: persistReducer(userPersistConfig, reducer.user),
};

const store = configureStore({
  reducer: reducers,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          userActionTypes.GET_TOKEN_BALANCE,
          userActionTypes.GET_NATIVE_BALANCE,
          userActionTypes.APPROVE,
          stakingActionTypes.STAKE,
          stakingActionTypes.HARVEST,
          stakingActionTypes.WITHDRAW,
          stakingActionTypes.GET_USER_STAKES,
          idoActionTypes.GET_USER_ALLOCATION,
          idoActionTypes.GET_IDO_LIST,
          idoActionTypes.GET_IDO_BY_ID,
          idoActionTypes.GET_INVESTMENTS_INFO,
        ],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export default { store, persistor };
