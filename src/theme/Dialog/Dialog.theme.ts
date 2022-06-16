import { ComponentsOverrides, ComponentsProps } from '@mui/material';
import { BG_MAIN, BG_MODAL_GRAY, BORDER_RADIUS_DEFAULT, SHADOW_MODAL_DEFAULT } from 'theme/variables';

export const getMuiDialogOverrides = (): ComponentsOverrides['MuiDialog'] => ({
  root: {
    background: BG_MODAL_GRAY,
  },

  paper: {
    width: '435px',
    minHeight: '227px',
    background: BG_MAIN,
    borderRadius: BORDER_RADIUS_DEFAULT,
    boxShadow: SHADOW_MODAL_DEFAULT,
  },
});

export const getMuiDialogDefaultProps = (): ComponentsProps['MuiDialog'] => ({});
