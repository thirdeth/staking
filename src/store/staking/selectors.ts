import type { StakingState, State } from 'types';

export default {
  getStaking: (state: State): StakingState => state.staking,
  getProp:
    <T extends keyof StakingState>(propKey: T) =>
    (state: State) =>
      state.staking[propKey],
};
