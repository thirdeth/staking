import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'components/Modal';
import { useShallowSelector } from 'hooks';
import { useWalletConnectorContext } from 'services/WalletConnect';
import { setActiveModal } from 'store/modals/reducer';
import modalsSelector from 'store/modals/selectors';
import userSelector from 'store/user/selectors';
import { Modals, ModalsInitialState, State } from 'types/store';

import { ConnectWalletModal, DisconnectModal, modalData } from './index';

export const NotificationModal: FC = () => {
  const dispatch = useDispatch();
  const { modalState } = useShallowSelector<State, ModalsInitialState>(modalsSelector.getModals);
  const address = useShallowSelector(userSelector.getProp('address'));
  const { connect, disconnect } = useWalletConnectorContext();
  const currData = modalData[modalState.activeModal];

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
    <Modal open={modalState.open} onClose={closeModal} title={currData.title}>
      {modalState.activeModal === Modals.ConnectWallet && (
        <ConnectWalletModal closeModal={closeModal} onConnectWallet={connect} currData={currData} />
      )}
      {modalState.activeModal === Modals.Disconnect && (
        <DisconnectModal address={address} closeModal={closeModal} disconnect={disconnect} />
      )}
    </Modal>
  );
};
