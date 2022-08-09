import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';

export const getMuiCssBaselineOverrides = (theme: Theme): ComponentsOverrides['MuiCssBaseline'] => ({
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
});

export const getMuiCssBaselineDefaultProps = (): ComponentsProps['MuiCssBaseline'] => ({});
