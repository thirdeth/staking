import { MainLogo } from 'assets/img';
import { IdoStatus } from 'types/store/requests';

import { RowCardProps } from './RowCard';

export const rowCardPropsMocked: RowCardProps = {
  cardData: {
    id: 1,
    projectName: 'Arbishpere',
    projectIcon: MainLogo,
    token: {
      name: 'ETH',
      symbol: 'ETH',
      icon: MainLogo,
    },
    boughtAmount: '100,000',
    status: IdoStatus.inProgress,
  },
};
