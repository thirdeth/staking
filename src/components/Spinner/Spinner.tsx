import { FC } from 'react';
import { LoaderIcon } from 'components/Icon/components';
import { SpinnerSizeProps } from 'types';

import { spinnerStyleState } from './styleState';

export interface SpinnerProps {
  size?: SpinnerSizeProps;
}

export const Spinner: FC<SpinnerProps> = ({ size = 's' }) => {
  return (
    <LoaderIcon
      sx={{
        ...spinnerStyleState.size[size],
        animation: 'rotate 1s linear infinite',
        '@keyframes rotate': {
          '0%': {
            transform: 'rotate(0)',
          },
          '100%': {
            transform: 'rotate(1turn)',
          },
        },
      }}
    />
  );
};
