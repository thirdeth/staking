import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { SelectArrowDown } from 'components/Icon/components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiSelectOverrides = (theme: Theme): ComponentsOverrides['MuiSelect'] => ({
  filled: {
    background: 'transparent',
  },
});

export const getMuiSelectDefaultProps = (): ComponentsProps['MuiSelect'] => ({
  IconComponent: SelectArrowDown,
});
