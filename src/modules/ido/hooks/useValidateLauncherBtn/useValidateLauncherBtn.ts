import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { noop } from 'lodash';
import { useWalletConnectorContext } from 'services';
import { onClaim, onRefund, onRegistrationToIdo } from 'store/ido/actions';
import idoActionTypes from 'store/ido/actionTypes';
import idoSelector from 'store/ido/selectors';
import { setActiveModal } from 'store/modals/reducer';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';
import { IdoState, Modals, RequestStatus, State, UserState } from 'types';
import { IdoPublic, IdoStatus } from 'types/store/requests';

import { BtnHandlerType, HandlersKeys } from './useValidateLauncherBtn.types';
import { validateWithoutWeights, validateWithWeights } from './useValidateLauncherBtnHelpers';

export const useValidateLauncherBtn = (status: string, isUserOwner: boolean): [string, () => void, boolean, string] => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();

  const { address: userAddress, rankId } = useShallowSelector<State, UserState>(userSelector.getUser);
  const {
    isLiqAdded,
    userInfo: { userAllocation, claimAmount, payed, totalBought, contractHardCap, bought },
    currentIdo: { vesting, idoIncrement, type, decimals, maxBuyPercent },
  } = useShallowSelector<State, IdoState>(idoSelector.getIdo);

  const { [idoActionTypes.REFUND]: refundRequestStatus } = useShallowSelector(uiSelector.getUI);

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
        }),
      );
    }
  }, [dispatch, id, idoIncrement, userAddress, vesting, walletService]);

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

  const handleValidateBtnProps = useCallback(() => {
    // if user does not connected to wallet
    if (!userAddress.length) {
      setBtnText('Connect Wallet');
      setBtnHandler(() => () => handleOpenModal(Modals.ConnectWallet));
      setBtnVisible(true);
    } else {
      // if user connected and missed registration stage - btn will be hidden
      if (status !== IdoStatus.register && userAllocation === null && type === IdoPublic.publicStaking) {
        setBtnVisible(false);
        setTextMessage('You are not registered');
      }

      // if project with weights parametrs
      if (type === IdoPublic.publicStaking) {
        const [{ text, handlerKey, isVisible }, infoText] = validateWithWeights(
          status,
          +rankId,
          userAllocation,
          +payed,
          claimAmount,
          contractHardCap,
          totalBought,
          vesting,
          isLiqAdded,
          decimals,
        );
        setBtnText(text);
        setBtnHandler(getButtonHandlers()[handlerKey]);
        setBtnVisible(isVisible);
        setTextMessage(infoText);
      }

      // if project without weights parametrs
      if (type !== IdoPublic.publicStaking) {
        const [{ text, handlerKey, isVisible }, infoText] = validateWithoutWeights(
          status,
          userAllocation,
          +payed,
          claimAmount,
          contractHardCap,
          totalBought,
          vesting,
          type === 'public',
          isLiqAdded,
          decimals,
          isUserOwner,
          maxBuyPercent,
          bought,
        );
        setBtnText(text);
        setBtnHandler(getButtonHandlers()[handlerKey]);
        setBtnVisible(isVisible);
        setTextMessage(infoText);
      }
    }
  }, [
    userAddress.length,
    handleOpenModal,
    status,
    userAllocation,
    type,
    rankId,
    payed,
    claimAmount,
    contractHardCap,
    totalBought,
    vesting,
    isLiqAdded,
    decimals,
    getButtonHandlers,
    isUserOwner,
    maxBuyPercent,
    bought,
  ]);

  useEffect(() => {
    handleValidateBtnProps();
  }, [handleValidateBtnProps]);

  useEffect(() => {
    if (refundRequestStatus === RequestStatus.SUCCESS) {
      setBtnVisible(false);
    }
  }, [handleValidateBtnProps, refundRequestStatus]);

  return [btnText, btnHandler, isBtnVisible, textMessage];
};
