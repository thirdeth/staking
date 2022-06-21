import { ToggleButtonGroupProps } from '@mui/material';

import { ToggleBtnsProps } from './ToggleBtns';

export const toggleBtnsPropsMocked: ToggleBtnsProps & ToggleButtonGroupProps = {
  exclusive: true,
  value: 1,
  buttonsItems: [
    {
      value: 1,
      label: '30 DAYS',
    },
    {
      value: 2,
      label: '90 DAYS',
    },
    {
      value: 3,
      label: '180 DAYS',
    },
  ],
};
