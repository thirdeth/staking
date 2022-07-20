import { Modals } from 'types/store/modals';

export type ModalData = {
  [key in Modals]: {
    title: string;
    subtitle?: string;
  };
};

export const modalData: ModalData = {
  [Modals.ConnectWallet]: {
    title: 'Connect a Wallet',
    subtitle: 'Please select a wallet to connect to this dapp:',
  },
  [Modals.Disconnect]: {
    title: 'Disconnect wallet?',
  },
  [Modals.Invest]: {
    title: 'Invest',
  },
  [Modals.Vesting]: {
    title: 'Vesting',
  },
  [Modals.init]: {
    title: '',
  },
};
