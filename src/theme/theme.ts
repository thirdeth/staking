import type {} from '@mui/lab/themeAugmentation';
import { createTheme } from '@mui/material';
import {
  getMuiButtonDefaultProps,
  getMuiButtonOverrides,
  getMuiIconButtonDefaultProps,
  getMuiIconButtonOverrides,
} from 'theme/Button';
import { getMuiContainerDefaultProps, getMuiContainerOverrides } from 'theme/Container';
import { breakpointOptions, getMuiGridDefaultProps, getMuiGridOverrides } from 'theme/Grid';
import { getTypographyOptions } from 'theme/Typography';
import { COLOR_TEXT_BLACK } from 'theme/variables';

import { getMuiLoadingButtonDefaultProps, getMuiLoadingButtonOverrides } from './Button/LoadingButton.theme';
import { getMuiBackdropDefaultProps, getMuiBackdropOverrides } from './Backdrop';
import { getMuiBreadcrumbsDefaultProps, getMuiBreadcrumbsOverrides } from './Breadcrumbs';
import { getMuiCssBaselineDefaultProps, getMuiCssBaselineOverrides } from './CssBaseLine';
import { getMuiDialogDefaultProps, getMuiDialogOverrides } from './Dialog';
import { getMuiPopoverDefaultProps, getMuiPopoverOverrides } from './Popover';
import { getMuiTextFieldDefaultProps, getMuiTextFieldOverrides } from './TextField';

const themeBase = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: COLOR_TEXT_BLACK,
    },
  },
  typography: getTypographyOptions(),
  breakpoints: breakpointOptions,
});

export const theme = createTheme(themeBase, {
  components: {
    MuiGrid: {
      defaultProps: getMuiGridDefaultProps(),
      styleOverrides: getMuiGridOverrides(),
    },
    MuiContainer: {
      defaultProps: getMuiContainerDefaultProps(),
      styleOverrides: getMuiContainerOverrides(),
    },
    MuiBackdrop: {
      defaultProps: getMuiBackdropDefaultProps(),
      styleOverrides: getMuiBackdropOverrides(themeBase),
    },
    MuiButton: {
      defaultProps: getMuiButtonDefaultProps(),
      styleOverrides: getMuiButtonOverrides(themeBase),
    },
    MuiIconButton: {
      defaultProps: getMuiIconButtonDefaultProps(),
      styleOverrides: getMuiIconButtonOverrides(),
    },
    MuiLoadingButton: {
      defaultProps: getMuiLoadingButtonDefaultProps(),
      styleOverrides: getMuiLoadingButtonOverrides(),
    },
    MuiDialog: {
      defaultProps: getMuiDialogDefaultProps(),
      styleOverrides: getMuiDialogOverrides(),
    },
    MuiCssBaseline: {
      defaultProps: getMuiCssBaselineDefaultProps(),
      styleOverrides: getMuiCssBaselineOverrides(themeBase),
    },
    MuiPopover: {
      defaultProps: getMuiPopoverDefaultProps(),
      styleOverrides: getMuiPopoverOverrides(themeBase),
    },
    MuiBreadcrumbs: {
      defaultProps: getMuiBreadcrumbsDefaultProps(),
      styleOverrides: getMuiBreadcrumbsOverrides(),
    },
    MuiTextField: {
      defaultProps: getMuiTextFieldDefaultProps(),
      styleOverrides: getMuiTextFieldOverrides(themeBase),
    },
  },
});