import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { FontWeights } from 'theme/Typography';
import {
  BORDER_COLOR_INPUT_GRAY_DEFAULT,
  BORDER_COLOR_INPUT_GRAY_FOCUS,
  BORDER_COLOR_INPUT_GRAY_HOVER,
  BORDER_RADIUS_DEFAULT,
  COLOR_TEXT_BLACK,
  COLOR_TEXT_GRAY_DARK,
} from 'theme/variables';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiTextFieldOverrides = (theme?: Theme): ComponentsOverrides['MuiTextField'] => ({
  root: {
    boxShadow: 'none',
    border: '1px solid',
    borderColor: 'transparent',
    borderRadius: BORDER_RADIUS_DEFAULT,
    fontSize: '14px',
    '& input::placeholder': {
      opacity: 1,
      color: COLOR_TEXT_GRAY_DARK,
      fontWeight: FontWeights.fontWeightRegular,
    },
    '& .MuiOutlinedInput-input': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
      },
    },
    '& .MuiOutlinedInput-root': {
      color: COLOR_TEXT_BLACK,
      borderRadius: BORDER_RADIUS_DEFAULT,
      '& fieldset': {
        border: '1px solid',
        borderColor: BORDER_COLOR_INPUT_GRAY_DEFAULT,
      },
      '&:hover fieldset': {
        borderColor: BORDER_COLOR_INPUT_GRAY_HOVER,
      },
      '&.Mui-focused fieldset': {
        borderColor: BORDER_COLOR_INPUT_GRAY_FOCUS,
      },
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgba(26, 26, 26, 0.2)',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: 'rgba(26, 26, 26, 0.2)',
    },
  },
});

export const getMuiTextFieldDefaultProps = (): ComponentsProps['MuiTextField'] => ({
  inputProps: {
    style: {
      height: '44px',
      padding: '0 16px',
    },
  },
});
