import { ComponentsOverrides, ComponentsProps } from '@mui/material';

export const getMuiIconButtonOverrides = (): ComponentsOverrides['MuiIconButton'] => ({
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
