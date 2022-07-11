import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { useWalletConnectorContext } from 'services';
import { getInvestmentsInfo, getUserAllocation, onRegistrationToIdo } from 'store/ido/actions';
import idoSelector from 'store/ido/selectors';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';
import { Modals } from 'types';
import { IdoStatus } from 'types/store/requests';

export const useValidateLauncherBtn = (status: string): [string, () => void, boolean] => {
  const [isBtnVisible, setBtnVisible] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();
  const userAddress = useShallowSelector(userSelector.getProp('address'));
  const { userAllocation } = useShallowSelector(idoSelector.getProp('userInfo'));

  const handleNavigateToStake = () => {
    navigate(routes.staking.root.path);
  };

  const handleOpenModal = (modalType: Modals) => {
    dispatch(
      setActiveModal({
        activeModal: modalType,
        txHash: '',
        open: true,
      }),
    );
  };

  const handleRegister = () => {
    if (id) {
      dispatch(
        onRegistrationToIdo({
          address: userAddress,
          pk: +id,
        }),
      );
    }
  };
  const handleOpenClaimModal = () => {
    console.log('open claim');
  };

  useEffect(() => {
    if (userAddress.length && id) {
      dispatch(
        getUserAllocation({
          address: userAddress,
          pk: +id,
        }),
      );
      dispatch(
        getInvestmentsInfo({
          web3Provider: walletService.Web3(),
          idoId: id,
        }),
      );
    }
  }, [dispatch, id, userAddress, walletService]);

  useEffect(() => {
    if (userAllocation !== null) {
      setBtnVisible(false);
    }
  }, [userAllocation]);

  let btnText = 'Stake to participate';
  let btnHandler = handleNavigateToStake;

  // if user does not connected to wallet
  if (!userAddress.length) {
    btnText = 'Connect Wallet';
    btnHandler = () => handleOpenModal(Modals.ConnectWallet);
  } else {
    // if user connected check the current project status
    if (status === IdoStatus.register) {
      btnText = 'Register';
      btnHandler = handleRegister;
    }
    if (status === IdoStatus.registrationClosed) {
      btnText = 'Stake more';
    }
    if (status === IdoStatus.registrationClosed) {
      btnText = 'Invest';
      btnHandler = () => handleOpenModal(Modals.Invest);
    }
    if (status === IdoStatus.completedSuccess || status === IdoStatus.completedFail) {
      btnText = 'Claim';
      btnHandler = handleOpenClaimModal;
    }
  }

  return [btnText, btnHandler, isBtnVisible];
};
