import { buttonClasses, ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { FontWeights } from 'theme/Typography';
import {
  BG_BLUE,
  BG_BUTTON_BLUE,
  BG_BUTTON_BLUE_LIGHT,
  BG_BUTTON_WHITE,
  BORDER_BUTTON_BLUE,
  BORDER_BUTTON_GRAY,
  BORDER_RADIUS_DEFAULT,
  COLOR_TEXT_BLACK,
  COLOR_TEXT_BLUE,
  COLOR_TEXT_GRAY,
  COLOR_TEXT_WHITE,
  TRANSITION_DEFAULT_TIME,
} from 'theme/variables';

export const getMuiButtonOverrides = (theme: Theme): ComponentsOverrides['MuiButton'] => ({
  root: {
    textAlign: 'center',
    borderRadius: BORDER_RADIUS_DEFAULT,
    transition: TRANSITION_DEFAULT_TIME,
    textTransform: 'uppercase',
    fontWeight: FontWeights.fontWeightRegular,
    padding: theme.spacing(1, 2),
    minWidth: '130px',
    fontSize: '16px',
    lineHeight: '19px',
    fontFamily: '"Nasalization", san-serif',
    boxShadow: 'none',

    '&:hover': {
      boxShadow: 'none',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  startIcon: {
    '&>*:nth-of-type(1)': {
      fontSize: 'inherit',
    },
    marginRight: '4px',
  },

  endIcon: {
    '&>*:nth-of-type(1)': {
      fontSize: 'inherit',
    },
    marginLeft: '4px',
  },

  sizeSmall: {
    minWidth: '70px',
    fontSize: '12px',
    lineHeight: '16px',
  },

  sizeMedium: {
    padding: theme.spacing(0, 2),
    maxWidth: '300px',
    height: '44px',
  },
  sizeLarge: {
    padding: theme.spacing(0, 2),
    minWidth: '190px',
    height: '56px',
  },

  outlined: {
    color: COLOR_TEXT_BLUE,
    border: BORDER_BUTTON_BLUE,

    '&:hover': {
      color: COLOR_TEXT_WHITE,
      backgroundColor: BG_BLUE,
    },

    '&:active': {
      color: COLOR_TEXT_WHITE,
      backgroundColor: BG_BLUE,
    },

    [`&.${buttonClasses.disabled}`]: {
      color: COLOR_TEXT_GRAY,
      borderColor: BORDER_BUTTON_GRAY,
    },
  },

  contained: {
    color: COLOR_TEXT_WHITE,
    backgroundColor: BG_BUTTON_BLUE,

    '&:hover': {
      backgroundColor: BG_BUTTON_BLUE_LIGHT,
    },

    '&:active': {
      backgroundColor: BG_BUTTON_BLUE_LIGHT,
    },

    [`&.${buttonClasses.disabled}`]: {
      color: COLOR_TEXT_GRAY,
      borderColor: BORDER_BUTTON_GRAY,
    },
  },

  containedSecondary: {
    color: COLOR_TEXT_BLACK,
    backgroundColor: BG_BUTTON_WHITE,

    '&:hover': {
      color: COLOR_TEXT_WHITE,
      backgroundColor: BG_BUTTON_BLUE_LIGHT,
    },

    '&:active': {
      color: COLOR_TEXT_WHITE,
      backgroundColor: BG_BUTTON_BLUE_LIGHT,
    },

    [`&.${buttonClasses.disabled}`]: {
      color: COLOR_TEXT_GRAY,
      borderColor: BORDER_BUTTON_GRAY,
    },
  },

  text: {
    background: 'none',
    backgroundColor: 'transparent',
    transition: '0',
    boxSizing: 'border-box',
    borderColor: 'transparent',
    padding: 0,
    margin: 0,
    minWidth: 0,

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

export const getMuiButtonDefaultProps = (): ComponentsProps['MuiButton'] => ({
  disableElevation: false,
  disableFocusRipple: true,
  disableRipple: true,
  variant: 'contained',
});
