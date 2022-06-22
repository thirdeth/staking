import { ComponentsOverrides, ComponentsProps } from '@mui/material';

export const getMuiContainerOverrides = (): ComponentsOverrides['MuiContainer'] => ({});

export const getMuiContainerDefaultProps = (): ComponentsProps['MuiContainer'] => ({
  maxWidth: 'lg',
  sx: {
    px: {
      xs: 3,
      sm: 3,
      md: 0,
      lg: 0,
    },
    mx: 'auto',
  },
});
