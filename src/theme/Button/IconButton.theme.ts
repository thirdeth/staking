import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiIconButtonOverrides = (theme?: Theme): ComponentsOverrides['MuiIconButton'] => ({
  root: {
    padding: 0,
    '&:hover': {
      background: 'transparent',
    },
  },
});

export const getMuiIconButtonDefaultProps = (): ComponentsProps['MuiIconButton'] => ({
  disableFocusRipple: true,
  disableRipple: true,
});
