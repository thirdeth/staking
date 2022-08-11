import { createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IConnect, IError } from '@amfi/connect-wallet/dist/interface';
import { useShallowSelector } from 'hooks';
import { Subscription } from 'rxjs';
import { connectWallet } from 'services/WalletService/config';
import { notifyText } from 'services/WalletService/config/constants';
import { disconnectWalletState, updateUserState } from 'store/user/reducer';
import userSelector from 'store/user/selectors';
import { Chains, State, UserState, WalletProviders } from 'types';
import { getToastMessage, shortenPhrase } from 'utils';

import { WalletService } from '../WalletService';

interface IContextValue {
  connect: (provider: WalletProviders, chain: Chains) => Promise<void>;
  disconnect: () => void;
  walletService: WalletService;
}

interface WalletConnectProps {
  children: ReactNode;
}

type IAccountInfo = IConnect | IError | { address: string };

const Web3Context = createContext({} as IContextValue);

const WalletConnectContext: FC<WalletConnectProps> = ({ children }) => {
  const [currentSubscriber, setCurrentSubscriber] = useState<Subscription>();
  const WalletConnect = useMemo(() => new WalletService(), []);
  const dispatch = useDispatch();
  const {
    address,
    provider: WalletProvider,
    chainType,
    network,
  } = useShallowSelector<State, UserState>(userSelector.getUser);

  const disconnect = useCallback(() => {
    dispatch(disconnectWalletState());
    WalletConnect.resetConnect();
    currentSubscriber?.unsubscribe();
    getToastMessage('info', notifyText.disconnet.info);
  }, [WalletConnect, currentSubscriber, dispatch]);

  const subscriberSuccess = useCallback(
    (res: { name: string }) => {
      if (document.visibilityState !== 'visible') {
        disconnect();
      }
      if (res.name === 'accountsChanged') {
        disconnect();
        getToastMessage('info', 'Please sign login message at MetaMask');
      }
    },
    [disconnect],
  );

  const subscriberError = useCallback(
    (error: { code: number }) => {
      // eslint-disable-next-line no-console
      console.error(error);
      if (error.code !== 4) {
        WalletConnect.resetConnect();
        getToastMessage('error', 'You changed to wrong network. Please choose Binance-Smart-Chain');
        dispatch(disconnectWalletState());
      }
    },
    [WalletConnect, dispatch],
  );

  const connect = useCallback(
    async (provider: WalletProviders, chain: Chains) => {
      const connected = await WalletConnect.initWalletConnect(provider, chain, chainType);
      if (connected) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const sub: any = WalletConnect.eventSubscribe().subscribe(subscriberSuccess, subscriberError);
          const accountInfo: IAccountInfo = await WalletConnect.getAccount();
          const accountAddress = (accountInfo as IConnect).address;
          if (accountAddress) {
            dispatch(
              updateUserState({
                provider: (accountInfo as IError).type,
                address: accountAddress,
                network: chain,
              }),
            );
            getToastMessage('success', `Wallet connected: ${shortenPhrase(accountAddress, 3, 3)}`);
          }

          setCurrentSubscriber(sub);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (!window.ethereum) {
            window.open(
              `https://metamask.app.link/dapp/${window.location.hostname + window.location.pathname}/?utm_source=mm`,
            );
            return;
          }

          if (error.code === 4 && error.type === 'MetaMask') {
            const chainParams = connectWallet(Chains.Cronos, chainType);
            window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${chainParams.network.chainID.toString(16)}`,
                  chainName: chainParams.network.chainName,
                  nativeCurrency: chainParams.network.nativeCurrency,
                  rpcUrls: [chainParams.network.rpc],
                  blockExplorerUrls: [chainParams.network.blockExplorerUrl],
                },
              ],
            });
          }
        }
      }
    },
    [WalletConnect, chainType, dispatch, subscriberError, subscriberSuccess],
  );

  useEffect(() => {
    // connect user if he connected previously
    if (WalletProvider && !address.length) {
      connect(WalletProviders.metamask, network);
    }
  }, [WalletProvider, address.length, connect, network]);

  return (
    <Web3Context.Provider value={{ connect, disconnect, walletService: WalletConnect }}>
      {children}
    </Web3Context.Provider>
  );
};

const useWalletConnectorContext = () => useContext(Web3Context);

export { WalletConnectContext, useWalletConnectorContext };
