import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { noop } from 'lodash';
import { useWalletConnectorContext } from 'services';
import { onClaim, onRefund, onRegistrationToIdo } from 'store/ido/actions';
import idoSelector from 'store/ido/selectors';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';
import { IdoState, Modals, State, UserState } from 'types';
import { IdoStatus } from 'types/store/requests';

import { BtnHandlerType, HandlersKeys } from './useValidateLauncherBtn.types';
import { validateWithoutWeights, validateWithWeights } from './useValidateLauncherBtnHelpers';

export const useValidateLauncherBtn = (status: string): [string, () => void, boolean, string] => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();

  const { address: userAddress, rankId } = useShallowSelector<State, UserState>(userSelector.getUser);
  const {
    userInfo: { userAllocation, claimAmount, payed },
    currentIdo: { withWeights, vesting, idoIncrement, ownerAddress, isPublic },
  } = useShallowSelector<State, IdoState>(idoSelector.getIdo);

  // ----------------- Button handlers ------------------
  const handleNavigateToStake = useCallback(() => {
    navigate(routes.staking.root.path);
  }, [navigate]);

  const handleOpenModal = useCallback(
    (modalType: Modals) => {
      dispatch(
        setActiveModal({
          activeModal: modalType,
          txHash: '',
          open: true,
        }),
      );
    },
    [dispatch],
  );

  const handleRegister = useCallback(() => {
    if (id) {
      dispatch(
        onRegistrationToIdo({
          address: userAddress,
          pk: +id,
          web3Provider: walletService.Web3(),
          idoIncrement: idoIncrement.toString(),
          vesting: !!vesting,
          ownerAddress: ownerAddress as string,
        }),
      );
    }
  }, [dispatch, id, idoIncrement, userAddress, vesting, walletService, ownerAddress]);

  const handleClaim = useCallback(() => {
    if (id) {
      dispatch(
        onClaim({
          web3Provider: walletService.Web3(),
          idoIncrement: idoIncrement.toString(),
        }),
      );
    }
  }, [dispatch, id, idoIncrement, walletService]);

  const handleRefund = useCallback(() => {
    dispatch(
      onRefund({
        web3Provider: walletService.Web3(),
        idoIncrement: idoIncrement.toString(),
      }),
    );
  }, [dispatch, idoIncrement, walletService]);

  const getButtonHandlers = useCallback(() => {
    return {
      [HandlersKeys.navigate]: () => handleNavigateToStake,
      [HandlersKeys.openInvestModal]: () => () => handleOpenModal(Modals.Invest),
      [HandlersKeys.openConnectModal]: () => () => handleOpenModal(Modals.ConnectWallet),
      [HandlersKeys.openVestingModal]: () => () => handleOpenModal(Modals.Vesting),
      [HandlersKeys.register]: () => handleRegister,
      [HandlersKeys.refund]: () => handleRefund,
      [HandlersKeys.claim]: () => handleClaim,
    };
  }, [handleClaim, handleNavigateToStake, handleOpenModal, handleRefund, handleRegister]);
  // --------------------------------------------------

  const [isBtnVisible, setBtnVisible] = useState(true);
  const [btnText, setBtnText] = useState('');
  const [textMessage, setTextMessage] = useState('');
  const [btnHandler, setBtnHandler] = useState<BtnHandlerType>(() => noop);

  const handleValidateValidBtnProps = useCallback(() => {
    // if user does not connected to wallet
    if (!userAddress.length) {
      setBtnText('Connect Wallet');
      setBtnHandler(() => () => handleOpenModal(Modals.ConnectWallet));
      setBtnVisible(true);
    } else {
      // if user connected and missed registration stage - btn will be hidden
      if (status !== IdoStatus.register && userAllocation === null && withWeights) {
        setBtnVisible(false);
        setTextMessage('You are not registered');
      }

      // if project with weights parametrs
      if (withWeights) {
        const [{ text, handlerKey, isVisible }, infoText] = validateWithWeights(
          status,
          +rankId,
          userAllocation,
          +payed,
          claimAmount,
          vesting,
        );
        setBtnText(text);
        setBtnHandler(getButtonHandlers()[handlerKey]);
        setBtnVisible(isVisible);
        setTextMessage(infoText);
      }

      // if project without weights parametrs
      if (!withWeights) {
        const [{ text, handlerKey, isVisible }, infoText] = validateWithoutWeights(
          status,
          userAllocation,
          +payed,
          claimAmount,
          vesting,
          isPublic,
        );
        setBtnText(text);
        setBtnHandler(getButtonHandlers()[handlerKey]);
        setBtnVisible(isVisible);
        setTextMessage(infoText);
      }
    }
  }, [
    isPublic,
    vesting,
    withWeights,
    claimAmount,
    getButtonHandlers,
    handleOpenModal,
    payed,
    rankId,
    status,
    userAddress.length,
    userAllocation,
  ]);

  useEffect(() => {
    handleValidateValidBtnProps();
  }, [handleValidateValidBtnProps]);

  return [btnText, btnHandler, isBtnVisible, textMessage];
};
