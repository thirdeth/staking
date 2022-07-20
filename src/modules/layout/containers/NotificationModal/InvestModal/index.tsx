import { FC, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Box, Button, InputAdornment, Paper, Stack, styled, TextField, Tooltip, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useValidateInputField, ValidationTypes } from 'hooks';
import { onInvest } from 'store/ido/actions';
import { FontFamilies, FontWeights } from 'theme/Typography';
import {
  BG_BLUE_LIGHT,
  BORDER_BUTTON_BLUE,
  BORDER_BUTTON_RED,
  COLOR_TEXT_BLUE,
  COLOR_TEXT_GRAY_DARK,
  COLOR_TEXT_RED,
} from 'theme/variables';
import { INotifyModalProps, Nullable, RequestStatus } from 'types';
import Web3 from 'web3';

const Item = styled(Paper)({
  border: 'none',
  boxShadow: 'none',
});

export type InvestModalProps = {
  userBalance: string;
  nativeBalance: string;
  tokenPrice: number;
  userAllocation: Nullable<string>;
  web3Provider: Web3;
  investRequestStatus: RequestStatus;
} & INotifyModalProps;

export const InvestModal: FC<InvestModalProps> = ({
  userBalance,
  nativeBalance,
  tokenPrice,
  userAllocation,
  web3Provider,
  investRequestStatus,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const [investValue, setInvestValue, setOriginInvestValue] = useValidateInputField(ValidationTypes.number);

  const isInvesting = investRequestStatus === RequestStatus.REQUEST;
  const isInvested = investRequestStatus === RequestStatus.SUCCESS;

  const maxInvestValue = useMemo<string>(() => {
    if (!userAllocation) {
      return '';
    }

    if (+userAllocation <= +nativeBalance) {
      return userAllocation.toString();
    }

    if (+userAllocation > +nativeBalance) {
      return nativeBalance;
    }

    return '0';
  }, [nativeBalance, userAllocation]);

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
    if (isInvested) {
      setOriginInvestValue('');
    }
  }, [isInvested, setOriginInvestValue]);

  const receiveValue = new BigNumber(+investValue / tokenPrice).toString(10);
  return (
    <Stack spacing={2}>
      <Item>
        <Typography variant="body2" color={COLOR_TEXT_GRAY_DARK}>
          You&apos;ve successfully for IDO.
        </Typography>
      </Item>

      <Item>
        <Typography
          sx={{
            strong: {
              maxWidth: '250px',
              overflow: 'hidden',
              fontWeight: FontWeights.fontWeightRegular,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }}
        >
          Balance: <strong>{userBalance}</strong> CRO
        </Typography>
        <TextField
          value={investValue}
          onChange={setInvestValue}
          variant="outlined"
          placeholder="0.00"
          sx={{ mb: 1, width: '100%' }}
          disabled={isInvesting}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="text"
                  onClick={handleSetMaxInvestValue}
                  sx={{
                    px: 1,
                    height: '24px',
                    fontSize: '16px',
                    lineHeight: '24px',
                    textTransform: 'uppercase',
                    fontFamily: FontFamilies.primary,
                    color: COLOR_TEXT_BLUE,
                    background: BG_BLUE_LIGHT,
                    border: BORDER_BUTTON_BLUE,
                    borderRadius: '4px',
                  }}
                >
                  Max
                </Button>
              </InputAdornment>
            ),
          }}
        />
        <TextField value={`${receiveValue}`} variant="outlined" placeholder="0.00" sx={{ width: '100%' }} disabled />
      </Item>

      <Item sx={{ width: 'fit-content' }}>
        <Tooltip title={maxInvestValue} arrow placement="top-start">
          <Typography variant="body2" color={COLOR_TEXT_GRAY_DARK}>
            Max Invest: {maxInvestValue} CRO
          </Typography>
        </Tooltip>
      </Item>

      <Item>
        <Box display="flex" justifyContent="space-between">
          <LoadingButton variant="contained" loading={isInvesting} onClick={handleInvest} sx={{ width: '100%' }}>
            Confirm
          </LoadingButton>
          <Button
            onClick={closeModal}
            variant="outlined"
            sx={{
              ml: 2,
              width: '100%',
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
