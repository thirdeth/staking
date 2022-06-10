import { FC } from 'react';
import { Button } from 'components';
import { Chains, INotifyModalProps, WalletProviders } from 'types';

import s from '../styles.module.scss';

interface IConnectWalletModalProps extends INotifyModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConnectWallet: (provider: any, newChain: any) => void;
}

export const ConnectWalletModal: FC<IConnectWalletModalProps> = ({ onConnectWallet, closeModal }) => {
  return (
    <div className={s.connect}>
      <Button
        className={s.connectBtn}
        onClick={() => {
          onConnectWallet(WalletProviders.metamask, Chains.bsc);
          closeModal();
        }}
      >
        Metamask
      </Button>
      {/* <Button
        className={s.connectBtn}
        onClick={() => onConnectWallet(WalletProviders.walletConnect, Chains.bsc)}
      >
        Wallet Connect
      </Button> */}
    </div>
  );
};
