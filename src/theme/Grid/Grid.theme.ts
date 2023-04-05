import { BreakpointsOptions, ComponentsOverrides, ComponentsProps } from '@mui/material';

export const breakpointOptions: BreakpointsOptions = {
  values: {
    xs: 360,
    sm: 600,
    md: 950,
    lg: 1200,
    xl: 1680,
  },
};

export const getMuiGridOverrides = (): ComponentsOverrides['MuiGrid'] => ({});

export const getMuiGridDefaultProps = (): ComponentsProps['MuiGrid'] => ({
  xs: 'auto',
  lineHeight: 0,
});
