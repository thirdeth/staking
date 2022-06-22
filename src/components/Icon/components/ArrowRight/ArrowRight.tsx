import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const ArrowRight: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 20 20"
    sx={{
      ...sx,
      width: '20px',
      height: '20px',
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.29289 14.7071C7.90237 14.3166 7.90237 13.6834 8.29289 13.2929L11.5858 10L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L13.7071 9.29289C14.0976 9.68342 14.0976 10.3166 13.7071 10.7071L9.70711 14.7071C9.31658 15.0976 8.68342 15.0976 8.29289 14.7071Z"
      fill="currentColor"
    />
  </SvgIcon>
);
