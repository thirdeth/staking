import { ChangeEventHandler, FC } from 'react';
import { Button, InputAdornment, TextField } from '@mui/material';
import { FontFamilies } from 'theme/Typography';
import { BG_BLUE_LIGHT, BORDER_BUTTON_BLUE, COLOR_TEXT_BLUE } from 'theme/variables';

type InvestTextFieldProps = {
  investValue: string;
  disabled: boolean;
  onChangeInvestValue: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onSetMaxInvestValue: () => void;
};

export const InvestTextField: FC<InvestTextFieldProps> = ({
  investValue,
  onChangeInvestValue,
  disabled,
  onSetMaxInvestValue,
}) => {
  return (
    <TextField
      value={investValue}
      onChange={onChangeInvestValue}
      variant="outlined"
      placeholder="0.00"
      fullWidth
      sx={{ mb: 1 }}
      disabled={disabled}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="text"
              onClick={onSetMaxInvestValue}
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
  );
};
