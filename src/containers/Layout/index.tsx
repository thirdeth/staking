import { FC, ReactNode, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, NotificationModal } from 'containers';
import { useSmoothTopScroll } from 'hooks';
import { useWalletConnectorContext } from 'services';

import s from './styles.module.scss';

export interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { connect, disconnect } = useWalletConnectorContext();

  const firstPathAtPathname = useMemo(() => pathname.split('/')[1], [pathname]);
  useSmoothTopScroll(firstPathAtPathname);

  const handleConnectWallet = useCallback(
    async (provider, newChain) => {
      connect(provider, newChain);
    },
    [connect],
  );

  const disconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <>
      <NotificationModal onConnectWallet={handleConnectWallet} />
      <Header disconnect={disconnectWallet} />

      <main className={s.mainContainer}>{children}</main>
    </>
  );
};
