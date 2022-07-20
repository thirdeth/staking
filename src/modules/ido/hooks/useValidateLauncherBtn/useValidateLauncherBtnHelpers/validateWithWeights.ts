import BigNumber from 'bignumber.js';
import { Nullable } from 'types';
import { IdoStatus } from 'types/store/requests';
import { fromDecimals } from 'utils';

import { HandlersKeys, ValidBtnProps } from '../useValidateLauncherBtn.types';

export const validateWithWeights = (
  status: string,
  rankId: number,
  userAllocation: Nullable<string>,
  payed: number,
  claimAmount: string[],
  vesting = false,
): [ValidBtnProps, string] => {
  let resultValidBtnProps: ValidBtnProps = {
    text: '',
    handlerKey: HandlersKeys.openConnectModal,
    isVisible: false,
  };

  let resultTextMessage = '';

  const wasBought = userAllocation
    ? +new BigNumber(+userAllocation).minus(new BigNumber(fromDecimals(payed, 18))).toString() > 0
    : false;

  switch (status) {
    case IdoStatus.pending:
      resultValidBtnProps = {
        text: 'Stake to participate',
        handlerKey: HandlersKeys.navigate,
        isVisible: true,
      };
      break;

    case IdoStatus.register:
      // user has no stake yet
      if (rankId === 0) {
        resultValidBtnProps = {
          text: 'Stake more',
          handlerKey: HandlersKeys.navigate,
          isVisible: true,
        };
      }
      // user is not registered yet
      if (userAllocation === null) {
        resultValidBtnProps = {
          text: 'Register',
          handlerKey: HandlersKeys.register,
          isVisible: true,
        };
      }
      // user is registered return default
      resultTextMessage = 'Already registered';
      break;

    case IdoStatus.registrationClosed:
      resultValidBtnProps = {
        text: 'Stake more',
        handlerKey: HandlersKeys.navigate,
        isVisible: true,
      };
      break;

    case IdoStatus.inProgress:
      // if user doesn't bought all his part
      if (wasBought) {
        resultValidBtnProps = {
          text: 'Invest',
          handlerKey: HandlersKeys.openInvestModal,
          isVisible: true,
        };
      }
      // if user bought all his part - btn will be hidden and uses message
      resultTextMessage = 'Wait for the project to be finished to claim your tokens';
      break;

    case IdoStatus.completedFail:
      // user can return his CRO
      if (+payed > 0) {
        resultValidBtnProps = {
          text: 'Refund',
          handlerKey: HandlersKeys.refund,
          isVisible: true,
        };
      }
      // user returned his CRO or didn't invest
      resultTextMessage = 'You already refunded your tokens';
      break;

    case IdoStatus.completedSuccess:
      // it means thath user can claim and should check other items claimAmountArr
      if (+claimAmount[0] > 0) {
        // user can claim
        if (+claimAmount[1] > 0 && !vesting) {
          resultValidBtnProps = {
            text: 'Claim',
            handlerKey: HandlersKeys.claim,
            isVisible: true,
          };
        }
        if (vesting) {
          resultValidBtnProps = {
            text: 'Claim',
            handlerKey: HandlersKeys.openVestingModal,
            isVisible: true,
          };
        }
        if (+claimAmount[1] === 0) {
          resultTextMessage = 'You already claimed';
        }
      }
      if (+claimAmount[0] === 0) {
        resultTextMessage = 'You already claimed';
      }
      break;

    default:
      resultValidBtnProps = {
        text: 'Connect Wallet',
        handlerKey: HandlersKeys.openConnectModal,
        isVisible: true,
      };
  }

  return [resultValidBtnProps, resultTextMessage];
};