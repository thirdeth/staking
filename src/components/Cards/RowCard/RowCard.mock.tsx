import { CronosMockLogo } from 'assets/img';
import { IdoStatus } from 'types/store/requests';

import { RowCardProps } from './RowCard';

export const rowCardPropsMocked: RowCardProps = {
  cardData: {
    id: 1,
    projectName: 'CRONOS LAUNCHER',
    projectIcon: CronosMockLogo,
    token: {
      name: 'Cronos Launcher',
      symbol: 'CRO',
      icon: CronosMockLogo,
    },
    boughtAmount: '100,000',
    status: IdoStatus.inProgress,
  },
};
