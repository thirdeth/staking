import { CronosMockLogo } from 'assets/img';

import { RowCardProps } from './RowCard';

export const rowCardPropsMocked: RowCardProps = {
  cardData: {
    projectName: 'CRONOS LAUNCHER',
    projectIcon: CronosMockLogo,
    token: {
      name: 'Cronos Launcher',
      symbol: 'CRO',
      icon: CronosMockLogo,
    },
    boughtAmount: '100,000',
    status: 'progress',
  },
};
