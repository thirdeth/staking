import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const SelectCheckIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 11 8"
    sx={{
      ...sx,
      width: '11px',
      height: '8px',
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.7071 0.292893C11.0976 0.683417 11.0976 1.31658 10.7071 1.70711L4.70711 7.70711C4.31658 8.09763 3.68342 8.09763 3.29289 7.70711L0.292893 4.70711C-0.0976311 4.31658 -0.0976311 3.68342 0.292893 3.29289C0.683417 2.90237 1.31658 2.90237 1.70711 3.29289L4 5.58579L9.29289 0.292893C9.68342 -0.0976311 10.3166 -0.0976311 10.7071 0.292893Z"
      fill="#5E99F5"
    />
  </SvgIcon>
);
