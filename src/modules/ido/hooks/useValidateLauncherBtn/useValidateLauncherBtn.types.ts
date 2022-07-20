import { Modals } from 'types';

export enum HandlersKeys {
  navigate,
  openInvestModal,
  openConnectModal,
  openVestingModal,
  register,
  claim,
  refund,
}

export type ValidBtnProps = {
  text: string;
  handlerKey: HandlersKeys;
  isVisible: boolean;
};

export type BtnHandlerType = (params?: Modals) => void;
