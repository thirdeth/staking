import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const MainLogo: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 69 80"
    sx={{
      width: '55px',
      height: '64px',
      ...sx,
    }}
  >
    <path d="M34.5 39.5V80L69 60.0001L68.9996 19.9996L34.5 39.5Z" fill="#5E99F5" />
    <path d="M0.0371094 60.3744L0.0371436 20L34.5369 38.9998V79.8748L0.0371094 60.3744Z" fill="#3E74CF" />
    <path d="M34.5 0L69 20L34.9998 39.5L0 20L34.5 0Z" fill="#8cb2f5" />
    <path d="M34.4999 20L51.5 30L34.4999 39.5L18 30L34.4999 20Z" fill="#4272BF" />
    <path d="M51.5001 49.4998L34.5 58.9998V39.5L51.5001 30V49.4998Z" fill="#2A5EB3" />
    <path d="M34.5 39.5L17.944 29.9998V49.4998L34.5003 58.9998L34.5 39.5Z" fill="#06347C" />
  </SvgIcon>
);
