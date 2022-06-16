import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const HomeIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 18 18"
    sx={{
      ...sx,
      width: '18px',
      height: '18px',
    }}
  >
    <path
      d="M9.63632 2.06359C9.28485 1.71212 8.715 1.71212 8.36353 2.06359L2.06353 8.36359C1.71206 8.71506 1.71206 9.28491 2.06353 9.63638C2.415 9.98786 2.98485 9.98786 3.33632 9.63638L3.59993 9.37278V15.3C3.59993 15.797 4.00287 16.2 4.49993 16.2H6.29993C6.79698 16.2 7.19993 15.797 7.19993 15.3V13.5C7.19993 13.0029 7.60287 12.6 8.09993 12.6H9.89993C10.397 12.6 10.7999 13.0029 10.7999 13.5V15.3C10.7999 15.797 11.2029 16.2 11.6999 16.2H13.4999C13.997 16.2 14.3999 15.797 14.3999 15.3V9.37278L14.6635 9.63638C15.015 9.98786 15.5849 9.98786 15.9363 9.63638C16.2878 9.28491 16.2878 8.71506 15.9363 8.36359L9.63632 2.06359Z"
      fill="#D8D8D8"
    />
  </SvgIcon>
);