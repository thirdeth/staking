import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'components/Modal';
import { useShallowSelector } from 'hooks';
import { setActiveModal } from 'store/modals/reducer';
import modalsSelector from 'store/modals/selectors';
import { Modals, ModalsInitialState, State } from 'types/store';

import { ConnectWalletModal } from './index';

import s from './styles.module.scss';

export interface NotificationModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConnectWallet: (provider: any, newChain: any) => void;
}

export const NotificationModal: FC<NotificationModalProps> = ({ onConnectWallet }) => {
  const dispatch = useDispatch();
  const { modalState } = useShallowSelector<State, ModalsInitialState>(modalsSelector.getModals);

  const closeModal = useCallback(() => {
    dispatch(
      setActiveModal({
        activeModal: Modals.init,
        txHash: '',
        open: false,
      }),
    );
  }, [dispatch]);

  return (
    <div>
      {modalState.activeModal === Modals.ConnectWallet && (
        <Modal visible={modalState.open} onClose={closeModal} className={s.root}>
          <ConnectWalletModal closeModal={closeModal} onConnectWallet={onConnectWallet} />
        </Modal>
      )}
    </div>
  );
};
