import type { IdoState, State } from 'types';

export default {
  getIdo: (state: State): IdoState => state.ido,
  getProp:
    <T extends keyof IdoState>(propKey: T) =>
    (state: State) =>
      state.ido[propKey],
};
