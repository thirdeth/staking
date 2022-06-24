import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { BG_BLUE } from 'theme/variables';

export const CurveLine: FC<SvgIconProps> = ({ sx, strokeDashoffset, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 487 1265"
    sx={{
      ...sx,
      width: '487px',
      height: '1265px',
      path: {
        fill: 'none',
        stroke: BG_BLUE,
        strokeDasharray: 900,
        strokeDashoffset,
      },
    }}
  >
    <path
      d="M399 1262.5C399 1181.67 399 802.8 399 744C399 670.5 394.5 516.5 184 503.5C-26.5002 490.5 -61.4999 260 119.5 195.5C300.5 131 399 135 485 2"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </SvgIcon>
);
