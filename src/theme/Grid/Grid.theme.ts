import { BreakpointsOptions, ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';

export const breakpointOptions: BreakpointsOptions = {
  values: {
    xs: 390,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1680,
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiGridOverrides = (theme?: Theme): ComponentsOverrides['MuiGrid'] => ({});

export const getMuiGridDefaultProps = (): ComponentsProps['MuiGrid'] => ({
  xs: 'auto',
  lineHeight: 0,
});
