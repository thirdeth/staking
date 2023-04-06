import type { State, VaultState } from 'types';

export default {
  getVault: (state: State): VaultState => state.vault,
  getProp:
    <T extends keyof VaultState>(propKey: T) =>
    (state: State) =>
      state.vault[propKey],
};
