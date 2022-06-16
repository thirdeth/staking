import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const LoaderIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 62 62"
    sx={{
      ...sx,
      width: '62px',
      height: '62px',
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31 62C48.1208 62 62 48.1208 62 31C62 13.8792 48.1208 2.10343e-06 31 1.35505e-06C13.8792 6.06678e-07 -6.06678e-07 13.8792 -1.35505e-06 31C-2.10343e-06 48.1208 13.8792 62 31 62ZM55.3571 31C55.3571 44.4521 44.4521 55.3571 31 55.3571C17.5479 55.3571 6.64286 44.4521 6.64286 31C6.64286 17.5479 17.5479 6.64286 31 6.64286C44.4521 6.64286 55.3571 17.5479 55.3571 31Z"
      fill="url(#paint0_angular_2162_8174)"
    />
    <defs>
      <radialGradient
        id="paint0_angular_2162_8174"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(44.1216 34.7366) scale(31)"
      >
        <stop stopColor="#5E99F5" />
        <stop offset="1" stopColor="#5E99F5" stopOpacity="0" />
      </radialGradient>
    </defs>
  </SvgIcon>
);
