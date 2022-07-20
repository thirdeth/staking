import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'components/Modal';
import { useShallowSelector } from 'hooks';
import { useWalletConnectorContext } from 'services/WalletConnect';
import idoActionTypes from 'store/ido/actionTypes';
import idoSelector from 'store/ido/selectors';
import { setActiveModal } from 'store/modals/reducer';
import modalsSelector from 'store/modals/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';
import { IdoState, Modals, ModalsInitialState, State, UserState } from 'types/store';

import { ConnectWalletModal, DisconnectModal, InvestModal, modalData } from './index';
import { VestingModal } from './VestingModal';

export const NotificationModal: FC = () => {
  const dispatch = useDispatch();
  const { modalState } = useShallowSelector<State, ModalsInitialState>(modalsSelector.getModals);
  const { address, nativeBalance } = useShallowSelector<State, UserState>(userSelector.getUser);
  const {
    currentIdo,
    vestingInfo,
    userInfo: { userAllocation, claimAmount },
  } = useShallowSelector<State, IdoState>(idoSelector.getIdo);

  const { connect, disconnect, walletService } = useWalletConnectorContext();
  const currData = modalData[modalState.activeModal];

  const { [idoActionTypes.INVEST]: investRequestStatus, [idoActionTypes.CLAIM]: claimRequestStatus } =
    useShallowSelector(uiSelector.getUI);

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
        <InvestModal
          userBalance={nativeBalance}
          nativeBalance={nativeBalance}
          userAllocation={userAllocation}
          web3Provider={walletService.Web3()}
          tokenPrice={+currentIdo.price}
          investRequestStatus={investRequestStatus}
          closeModal={closeModal}
        />
      )}
      {modalState.activeModal === Modals.Vesting && (
        <VestingModal
          claimAmount={claimAmount}
          idoIncrement={currentIdo.idoIncrement.toString()}
          endTime={currentIdo.end}
          vestingInfo={vestingInfo}
          web3Provider={walletService.Web3()}
          claimRequestStatus={claimRequestStatus}
          closeModal={closeModal}
        />
      )}
    </Modal>
  );
};
