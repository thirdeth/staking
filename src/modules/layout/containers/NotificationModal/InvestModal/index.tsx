import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Paper, Stack, styled, TextField, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { TextWithTooltip } from 'components';
import { useValidateInputField, ValidationTypes } from 'hooks';
import { validateMaxInvestValue } from 'modules/ido/utils';
import { getTotalBought, onInvest } from 'store/ido/actions';
import actionTypes from 'store/ido/actionTypes';
import { BORDER_BUTTON_RED, COLOR_TEXT_GRAY_DARK, COLOR_TEXT_RED } from 'theme/variables';
import { INotifyModalProps, Nullable, RequestStatus } from 'types';
import Web3 from 'web3';

import { InvestTextField } from './components';

const Item = styled(Paper)({
  border: 'none',
  boxShadow: 'none',
});

export type InvestModalProps = {
  userBalance: string;
  nativeBalance: string;

  hardCap: string;
  tokenPrice: number;
  userAllocation: Nullable<string>;
  totalBought: string;
  idoIncrement: number;
  web3Provider: Web3;

  investRequestStatus: RequestStatus;
  getTotalBoughtRequestStatus: RequestStatus;
} & INotifyModalProps;

export const InvestModal: FC<InvestModalProps> = ({
  userBalance,
  nativeBalance,

  hardCap,
  tokenPrice,
  userAllocation,
  totalBought,
  idoIncrement,
  web3Provider,

  investRequestStatus,
  getTotalBoughtRequestStatus,
  closeModal,
}) => {
  const dispatch = useDispatch();

  const maxInvestValue = validateMaxInvestValue(hardCap, nativeBalance, tokenPrice, userAllocation, totalBought);
  const [investValue, setInvestValue, setOriginInvestValue] = useValidateInputField(
    ValidationTypes.number,
    18,
    +maxInvestValue,
  );

  const receiveValue = new BigNumber(+investValue / tokenPrice).toString(10);

  const isInvesting = investRequestStatus === RequestStatus.REQUEST;
  const isInvested = investRequestStatus === RequestStatus.SUCCESS;
  const isLoadingInfo = getTotalBoughtRequestStatus === RequestStatus.REQUEST;

  const handleSetMaxInvestValue = () => {
    setOriginInvestValue(maxInvestValue);
  };

  const handleInvest = () => {
    dispatch(
      onInvest({
        web3Provider,
        amount: investValue,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      getTotalBought({
        web3Provider,
        idoIncrement: idoIncrement.toString(),
      }),
    );
  }, [dispatch, idoIncrement, web3Provider]);

  useEffect(() => {
    if (isInvested) {
      setOriginInvestValue('');
      closeModal();
      dispatch({ type: `${actionTypes.INVEST}_RESET` });
    }
  }, [closeModal, dispatch, isInvested, setOriginInvestValue]);

  return (
    <Stack spacing={2}>
      <Item>
        <Typography variant="body2" color={COLOR_TEXT_GRAY_DARK}>
          You&apos;ve successfully for IDO.
        </Typography>
      </Item>

      <Item>
        <TextWithTooltip value={userBalance} startText="Balance:" endText="CRO" color={COLOR_TEXT_GRAY_DARK} />
        <InvestTextField
          investValue={investValue}
          disabled={isInvesting || isLoadingInfo}
          onChangeInvestValue={setInvestValue}
          onSetMaxInvestValue={handleSetMaxInvestValue}
        />
        <TextField value={`${receiveValue}`} variant="outlined" placeholder="0.00" fullWidth disabled />
      </Item>

      <Item sx={{ width: 'fit-content' }}>
        <TextWithTooltip value={maxInvestValue} startText="Max Invest:" endText="CRO" color={COLOR_TEXT_GRAY_DARK} />
      </Item>

      <Item>
        <Box display="flex" justifyContent="space-between">
          <LoadingButton
            variant="contained"
            fullWidth
            loading={isInvesting || isLoadingInfo}
            disabled={+investValue === 0}
            onClick={handleInvest}
          >
            Confirm
          </LoadingButton>
          <Button
            onClick={closeModal}
            variant="outlined"
            fullWidth
            sx={{
              ml: 2,
              border: BORDER_BUTTON_RED,
              color: COLOR_TEXT_RED,
              '&:hover': {
                border: BORDER_BUTTON_RED,
                background: COLOR_TEXT_RED,
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Item>
    </Stack>
  );
};
