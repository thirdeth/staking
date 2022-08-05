export * from './connect';
export * from './store';
export * from './contracts';
export * from './routes';
export * from './url';

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;

export enum WalletProviders {
  metamask = 'MetaMask',
  walletConnect = 'WalletConnect',
}

export type TReferrals = {
  registerTime: number;
  memberCode: string;
  memberLiquidity: number;
};

export enum RoundingModes {
  up,
  down,
}

export interface INotifyModalProps {
  currData?: {
    [k: string]: string;
  };
  closeModal: () => void;
}

export enum Modules {
  core = 'core',
  landing = 'landing',
  ido = 'ido',
  staking = 'staking',
  ranking = 'ranking',
  myInvestments = 'myInvestments',
}

export enum ProjectStages {
  upcoming = 'upcoming',
  open = 'open ido',
  completed = 'past ido',
}

export type ProjectStageProps = keyof typeof ProjectStages;

export type Nullable<T> = null | T;
