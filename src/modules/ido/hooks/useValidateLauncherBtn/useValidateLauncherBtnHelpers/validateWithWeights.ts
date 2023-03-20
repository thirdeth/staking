import BigNumber from 'bignumber.js';
import { Nullable } from 'types';
import { IdoStatus } from 'types/store/requests';
import { getDiffHardcapTotalBought } from 'utils';

import { HandlersKeys, ValidBtnProps } from '../useValidateLauncherBtn.types';

export const validateWithWeights = (
  status: string,
  rankId: number,
  userAllocation: Nullable<string>,
  payed: number,
  claimAmount: string[],
  contractHardCap: string,
  totalBought: string,
  vesting = false,
  isLiqAdded: boolean,
  decimals = 18,
): [ValidBtnProps, string] => {
  let resultValidBtnProps: ValidBtnProps = {
    text: '',
    handlerKey: HandlersKeys.openConnectModal,
    isVisible: false,
  };

  let resultTextMessage = '';

  const isWasntBought = userAllocation
    ? +new BigNumber(+userAllocation).minus(new BigNumber(payed).dividedBy(new BigNumber(10).pow(18))).toString() > 0
    : false;

  const isFullHardCap = +getDiffHardcapTotalBought(contractHardCap, totalBought, decimals).toString() === 0;

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
      if (userAllocation === null) {
        resultTextMessage = 'You are not registered';
      } else {
        resultValidBtnProps = {
          text: 'Increase allocation',
          handlerKey: HandlersKeys.navigate,
          isVisible: true,
        };
      }

      break;

    case IdoStatus.inProgress:
      // if user doesn't bought all his part
      if (userAllocation === null) {
        resultTextMessage = 'You are not registered';
      }

      if (isWasntBought && !isFullHardCap) {
        resultValidBtnProps = {
          text: 'Invest',
          handlerKey: HandlersKeys.openInvestModal,
          isVisible: true,
        };
      }
      // if user bought all his allocation part - btn will be hidden and uses message
      resultTextMessage = 'You can invest more due to allocation limitations';
      if (isFullHardCap) {
        resultTextMessage = 'You cant invest more due to hardcap limitations';
      }
      break;

    case IdoStatus.completedFail:
      // user can return his ETH
      if (+payed > 0) {
        resultValidBtnProps = {
          text: 'Refund',
          handlerKey: HandlersKeys.refund,
          isVisible: true,
        };
      }
      break;

    case IdoStatus.completedSuccess:
      // it means thath user can claim and should check other items claimAmountArr
      if (+claimAmount[0] > 0 && isLiqAdded) {
        // user can claim
        if (+claimAmount[1] > 0 && !vesting) {
          resultValidBtnProps = {
            text: 'Claim',
            handlerKey: HandlersKeys.claim,
            isVisible: true,
          };
        }
        // if user have reward but it is not current vesting stage - open vesting modal for watching stages
        if (vesting) {
          resultValidBtnProps = {
            text: 'Claim',
            handlerKey: HandlersKeys.openVestingModal,
            isVisible: true,
          };
        }
      } else if (+claimAmount[0] > 0 && !isLiqAdded) {
        resultTextMessage = 'Wait for the owner will add liquidity to claim your tokens';
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
