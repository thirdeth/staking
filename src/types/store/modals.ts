// eslint-disable-next-line no-shadow
export enum Modals {
  ConnectWallet = 'ConnectWallet',
  Disconnect = 'Disconnect',
  Invest = 'Invest',
  Vesting = 'Vesting',
  init = '',
}

export interface ModalState {
  activeModal: Modals;
  txHash: string;
  open: boolean;
}

export type ModalsInitialState = {
  modalState: ModalState;
};
