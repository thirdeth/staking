import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Close: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 25 24"
    sx={{
      ...sx,
      width: '25px',
      height: '24px',
    }}
  >
    <path
      d="M6.5 18L18.5 6M6.5 6L18.5 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
);
