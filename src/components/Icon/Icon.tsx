import { FC } from 'react';
import { SvgIconProps } from '@mui/material';

import {
  ArrowBreadcrumbs,
  ArrowDown,
  CheckIcon,
  Close,
  CoinIcon,
  Copy,
  DiscordIcon,
  HomeIcon,
  IdoIcon,
  LoaderIcon,
  LogoBlackLittle,
  MainLogo,
  MediumIcon,
  OutIcon,
  TelegramIcon,
  TwitterIcon,
  WalletIcon,
} from './components';

/* eslint-disable @typescript-eslint/no-shadow */
export enum IconKey {
  MainLogo = 'MainLogo',
  ArrowDown = 'ArrowDown',
  Copy = 'Copy',
  Close = 'Close',
  TwitterIcon = 'TwitterIcon',
  TelegramIcon = 'TelegramIcon',
  MediumIcon = 'MediumIcon',
  DiscordIcon = 'DiscordIcon',
  CheckIcon = 'CheckIcon',
  LogoBlackLittle = 'LogoBlackLittle',
  WalletIcon = 'WalletIcon',
  CoinIcon = 'CoinIcon',
  IdoIcon = 'IdoIcon',
  OutIcon = 'OutIcon',
  ArrowBreadcrumbs = 'ArrowBreadcrumbs',
  HomeIcon = 'HomeIcon',
  LoaderIcon = 'LoaderIcon',
}

/* eslint-enable @typescript-eslint/no-shadow */
export const Icon: Record<IconKey, FC<SvgIconProps>> = {
  MainLogo,
  ArrowDown,
  Copy,
  TwitterIcon,
  TelegramIcon,
  MediumIcon,
  DiscordIcon,
  Close,
  CheckIcon,
  LogoBlackLittle,
  WalletIcon,
  CoinIcon,
  IdoIcon,
  OutIcon,
  ArrowBreadcrumbs,
  HomeIcon,
  LoaderIcon,
};
