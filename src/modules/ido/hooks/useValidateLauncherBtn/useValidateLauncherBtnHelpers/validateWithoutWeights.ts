import BigNumber from 'bignumber.js/bignumber';
import { Nullable } from 'types';
import { IdoStatus } from 'types/store/requests';
import { getDiffHardcapTotalBought } from 'utils';

import { HandlersKeys, ValidBtnProps } from '../useValidateLauncherBtn.types';

export const validateWithoutWeights = (
  status: string,
  userAllocation: Nullable<string>,
  payed: number,
  claimAmount: string[],
  contractHardCap: string,
  totalBought: string,
  vesting = false,
  isPublic = false,
  isLiqAdded: boolean,
  decimals = 18,
  isUserOwner: boolean,
  maxBuyPercent: Nullable<string>,
): [ValidBtnProps, string] => {
  let resultValidBtnProps: ValidBtnProps = {
    text: '',
    handlerKey: HandlersKeys.openConnectModal,
    isVisible: false,
  };

  let resultTextMessage = '';

  const isFullHardCap = +getDiffHardcapTotalBought(contractHardCap, totalBought, decimals).toString() === 0;

  let isUserMaxBought: boolean;
  if (isPublic) {
    isUserMaxBought = new BigNumber(maxBuyPercent || '0').isEqualTo(
      new BigNumber(totalBought).dividedBy(contractHardCap).multipliedBy(100),
    );
  } else {
    isUserMaxBought = new BigNumber(userAllocation || '0').isEqualTo(
      new BigNumber(totalBought).dividedBy(contractHardCap).multipliedBy(100),
    );
  }

  switch (status) {
    case IdoStatus.pending:
      if (isPublic) {
        resultTextMessage = 'Wait for IDO start';
      } else if (userAllocation === null) {
        resultTextMessage = 'You are not in the whitelist. ';
      } else {
        resultTextMessage = 'Wait for IDO start';
      }
      break;

    case IdoStatus.inProgress:
      if (!isFullHardCap) {
        resultValidBtnProps = {
          text: 'Invest',
          handlerKey: HandlersKeys.openInvestModal,
          isVisible: true,
        };
      }
      // if user bought all his allocation part - btn will be hidden and uses message
      if (isFullHardCap) {
        resultTextMessage = 'You cant invest more due to hardcap limitations';
      }
      if (isUserMaxBought) {
        resultValidBtnProps = {
          text: 'Invest',
          handlerKey: HandlersKeys.openInvestModal,
          isVisible: false,
        };
        resultTextMessage = `You cant invest more due to ${isPublic ? 'max buy' : 'allocation'} limitations`;
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
        resultValidBtnProps = {
          text: 'Claim',
          handlerKey: vesting ? HandlersKeys.openVestingModal : HandlersKeys.claim,
          isVisible: true,
        };
        // if (+claimAmount[1] > 0) {
        //   resultValidBtnProps = {
        //     text: 'Claim',
        //     handlerKey: vesting ? HandlersKeys.openVestingModal : HandlersKeys.claim,
        //     isVisible: true,
        //   };
        // }
      }
      if (+claimAmount[1] === 0 && +claimAmount[0] === +claimAmount[2]) {
        resultValidBtnProps = {
          text: 'Claim',
          handlerKey: vesting ? HandlersKeys.openVestingModal : HandlersKeys.claim,
          isVisible: false,
        };
        resultTextMessage = '';
      }
      if (+claimAmount[0] > 0 && !isLiqAdded) {
        resultTextMessage = 'Wait for the owner will add liquidity to claim your tokens';
      }
      if (isUserOwner && isLiqAdded && +claimAmount[0] === 0) {
        resultTextMessage = 'Liquidity successfully added';
      }
      // if (+claimAmount[0] === 0 && isLiqAdded) {
      //   resultTextMessage = 'You already claimed';
      // }
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
