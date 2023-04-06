import type { Dispatch as DispatchReact } from 'react';

/* PLOP_INJECT_IMPORT_STATE */
import { IdoState } from './ido';
import { ModalsInitialState } from './modals';
import { StakingState } from './staking';
import { UserState } from './user';
import { VaultState } from './vault';

export * from './user';
export * from './ui';
export * from './modals';
/* PLOP_INJECT_IMPORT_TYPES */
export * from './ido';
export * from './staking';
export * from './vault';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T, P = any, M = void> = { type: T; payload?: P; meta?: M };
export type Dispatch = DispatchReact<{ type: string }>;

export type State = {
  user: UserState;
  modals: ModalsInitialState;
  /* PLOP_INJECT_MODIFY_STATE */
  ido: IdoState;
  staking: StakingState;
  vault: VaultState;
};
