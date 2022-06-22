import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const BurgerIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 20 14"
    sx={{
      ...sx,
      width: '20px',
      height: '14px',
    }}
  >
    <path
      d="M1 1H19M1 7H19M1 13H8.875"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
);
