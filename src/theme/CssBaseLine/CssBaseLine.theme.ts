import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { BG_MAIN } from 'theme/variables';

export const getMuiCssBaselineOverrides = (theme: Theme): ComponentsOverrides['MuiCssBaseline'] => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: 6,
    },
    '*::-webkit-scrollbar-track': {
      backgroundColor: BG_MAIN,
    },
    html: {
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      boxSizing: 'border-box',
    },
    body: {
      overflowX: 'hidden',
      margin: theme.spacing(0),
      overflowY: 'overlay',
    },
  },
});

export const getMuiCssBaselineDefaultProps = (): ComponentsProps['MuiCssBaseline'] => ({});
