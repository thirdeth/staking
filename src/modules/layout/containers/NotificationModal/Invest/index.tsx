import { ChangeEventHandler, FC } from 'react';
import { Box, Button, Grid, InputAdornment, Paper, Stack, styled, TextField, Typography } from '@mui/material';
import { FontFamilies } from 'theme/Typography';
import {
  BG_BLUE_LIGHT,
  BORDER_BUTTON_BLUE,
  BORDER_BUTTON_RED,
  COLOR_TEXT_BLUE,
  COLOR_TEXT_GRAY_DARK,
  COLOR_TEXT_RED,
} from 'theme/variables';
import { INotifyModalProps } from 'types';

const Item = styled(Paper)({
  border: 'none',
  boxShadow: 'none',
});

export type InvestProps = {
  userBalance: number;
  investValue: string;
  maxInvestValue: string;
  onInvest: () => void;
  onSetMaxInvestValue: (maxValue: string) => void;
  onChangeInvestValue: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
} & INotifyModalProps;

export const Invest: FC<InvestProps> = ({
  userBalance,
  investValue,
  maxInvestValue,
  onInvest,
  onChangeInvestValue,
  onSetMaxInvestValue,
  closeModal,
}) => {
  return (
    <Stack spacing={2}>
      <Item>
        <Typography variant="body2" color={COLOR_TEXT_GRAY_DARK}>
          You&apos;ve successfully for IDO.
        </Typography>
      </Item>

      <Item>
        <Typography>Balance:{userBalance} CRO</Typography>
        <TextField
          value={investValue}
          onChange={onChangeInvestValue}
          variant="outlined"
          placeholder="0.00"
          sx={{ mb: 1, width: '100%' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="text"
                  onClick={() => onSetMaxInvestValue(userBalance.toString())}
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
        <TextField value={`${+investValue * 3}`} variant="outlined" placeholder="0.00" sx={{ width: '100%' }} />
      </Item>

      <Item>
        <Typography variant="body2" color={COLOR_TEXT_GRAY_DARK}>
          Max Invest: {maxInvestValue} CRO
        </Typography>
      </Item>

      <Item>
        <Box display="flex" justifyContent="space-between">
          <Button onClick={onInvest} sx={{ width: '100%' }}>
            Confirm
          </Button>
          <Button
            onClick={closeModal}
            variant="outlined"
            sx={{
              ml: 2,
              width: '100%',
              border: BORDER_BUTTON_RED,
              color: COLOR_TEXT_RED,
              '&:hover': {
                background: 'transparent',
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
