import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';
import { BG_BLUE, BORDER_RADIUS_POPOVER } from 'theme/variables';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiPopoverOverrides = (theme: Theme): ComponentsOverrides['MuiPopover'] => ({
  root: {
    '.css-kyuf03-MuiBackdrop-root-MuiModal-backdrop': {
      background: 'rgba(0,0,0,0)',
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 2.5, 2.5),
    width: '310px',
    height: '328px',
    background: BG_BLUE,
    borderRadius: BORDER_RADIUS_POPOVER,
  },
});

export const getMuiPopoverDefaultProps = (): ComponentsProps['MuiPopover'] => ({});
