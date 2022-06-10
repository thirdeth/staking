import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiContainerOverrides = (theme?: Theme): ComponentsOverrides['MuiContainer'] => ({
  root: {
    width: 'auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const getMuiContainerDefaultProps = (): ComponentsProps['MuiContainer'] => ({
  maxWidth: 'lg',
  sx: {
    px: {
      xs: 0,
      sm: 0,
      md: 0,
      lg: 0,
    },
    mx: {
      xs: '10px',
      sm: '40px',
      md: '40px',
      lg: 'auto',
    },
  },
});
