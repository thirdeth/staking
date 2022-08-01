import { Nullable } from 'types';
import { IdoStatus } from 'types/store/requests';

import { HandlersKeys, ValidBtnProps } from '../useValidateLauncherBtn.types';

export const validateWithoutWeights = (
  status: string,
  userAllocation: Nullable<string>,
  payed: number,
  claimAmount: string[],
  vesting = false,
  isPublic = false,
  isLiqAdded: boolean,
): [ValidBtnProps, string] => {
  let resultValidBtnProps: ValidBtnProps = {
    text: '',
    handlerKey: HandlersKeys.openConnectModal,
    isVisible: false,
  };

  let resultTextMessage = '';

  switch (status) {
    case IdoStatus.pending:
      if (isPublic) {
        resultTextMessage = 'Wait for IDO start';
      } else if (userAllocation === null) {
        resultTextMessage = 'You are not in the whitelist. DYOR';
      } else {
        resultTextMessage = 'Wait for IDO start';
      }

      break;

    case IdoStatus.inProgress:
      resultValidBtnProps = {
        text: 'Invest',
        handlerKey: HandlersKeys.openInvestModal,
        isVisible: true,
      };
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
      // resultTextMessage = 'You already refunded your tokens';
      break;

    case IdoStatus.completedSuccess:
      // it means thath user can claim and should check other items claimAmountArr
      if (+claimAmount[0] > 0 && isLiqAdded) {
        // user can claim
        if (+claimAmount[1] > 0) {
          resultValidBtnProps = {
            text: 'Claim',
            handlerKey: vesting ? HandlersKeys.openVestingModal : HandlersKeys.claim,
            isVisible: true,
          };
        }
        if (+claimAmount[1] === 0) {
          resultTextMessage = 'You already claimed';
        }
      }
      // if (+claimAmount[0] === 0 && isLiqAdded) {
      //   resultTextMessage = 'You already claimed';
      // }
      if (!isLiqAdded) {
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
