import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'components/Modal';
import { useShallowSelector, useValidateInputField, ValidationTypes } from 'hooks';
import { useWalletConnectorContext } from 'services/WalletConnect';
import { setActiveModal } from 'store/modals/reducer';
import modalsSelector from 'store/modals/selectors';
import userSelector from 'store/user/selectors';
import { Modals, ModalsInitialState, State } from 'types/store';

import { ConnectWalletModal, DisconnectModal, Invest, modalData } from './index';

const MAX_INVEST_VALUE_MOCK = 2385;
const USER_BALANCE_MOCK = 1.123123;

export const NotificationModal: FC = () => {
  const dispatch = useDispatch();
  const { modalState } = useShallowSelector<State, ModalsInitialState>(modalsSelector.getModals);
  const address = useShallowSelector(userSelector.getProp('address'));
  const { connect, disconnect } = useWalletConnectorContext();
  const currData = modalData[modalState.activeModal];

  const [investValue, setInvestValue, setMaxInvestValue] = useValidateInputField(ValidationTypes.number);

  const handleInvest = () => {};

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
      {modalState.activeModal === Modals.Invest && (
        <Invest
          investValue={investValue}
          maxInvestValue={MAX_INVEST_VALUE_MOCK.toString()}
          userBalance={USER_BALANCE_MOCK}
          onInvest={handleInvest}
          onChangeInvestValue={setInvestValue}
          onSetMaxInvestValue={setMaxInvestValue}
          closeModal={closeModal}
        />
      )}
    </Modal>
  );
};
