import { ComponentsOverrides, ComponentsProps } from '@mui/material';

export const getMuiContainerOverrides = (): ComponentsOverrides['MuiContainer'] => ({});

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
