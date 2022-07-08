import { CronosMockLogo } from 'assets/img';
import { IdoType } from 'modules/ido/utils';
import { ProjectCardDataProps, RankCardDataProps } from 'types';
import { IdoStatus } from 'types/store/requests';

export const investmentsMockData: ProjectCardDataProps[] = [
  {
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
    startTime: '',
    hardCap: 1000,
    isPublic: false,
    type: IdoType.pending,
    timer: '',
    price: '0.003',
  },
  {
    id: 2,
    projectName: 'CRONOS LAUNCHER',
    projectIcon: CronosMockLogo,
    token: {
      name: 'Cronos Launcher',
      symbol: 'CRO',
      icon: CronosMockLogo,
    },
    boughtAmount: '100,000',
    status: IdoStatus.pending,
    startTime: '',
    hardCap: 0,
    isPublic: true,
    type: IdoType.pending,
    timer: '',
    price: '0.003',
  },
];

export const investmentsRankMockData: RankCardDataProps[] = [
  {
    id: 1,
    rankId: 1,
    walletAddress: '0x4064a8586217ffbc6ac72aad9eef5e7198c13cb7',
    stakedAmount: '100,000',
    buyDate: new Date(Date.UTC(2022, 7, 16)).getTime(),
    growAmount: 1,
  },
  {
    id: 2,
    rankId: 1,
    walletAddress: '0x4064a8586217ffbc6ac72aad9eef5e7198c13cb7',
    stakedAmount: '100,000',
    buyDate: new Date(Date.UTC(2022, 7, 16)).getTime(),
    growAmount: 1,
  },
  {
    id: 3,
    rankId: 1,
    walletAddress: '0x4064a8586217ffbc6ac72aad9eef5e7198c13cb7',
    stakedAmount: '100,000',
    buyDate: new Date(Date.UTC(2022, 7, 16)).getTime(),
    growAmount: 1,
  },
];
