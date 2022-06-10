import { routes } from 'appConstants/routes';
import { CoinIcon, IdoIcon, WalletIcon } from 'components/Icon/components';

export const accountLinkItems = [
  {
    title: 'My Wallet',
    Icon: WalletIcon,
    link: '/',
  },
  {
    title: 'My Investments',
    Icon: CoinIcon,
    link: routes['my-investments'].root.path,
  },
  {
    title: 'My IDOs',
    Icon: IdoIcon,
    link: '/',
  },
];
