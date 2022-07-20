import { FC } from 'react';
import { Box, styled } from '@mui/material';
import { LoaderIcon } from 'components/Icon/components';
import { BG_MAIN } from 'theme/variables';
import { SpinnerSizeProps } from 'types';

import { spinnerStyleState } from './styleState';

const LoaderIconStyled = styled(LoaderIcon)({
  animation: 'rotate 1s linear infinite',
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0)',
    },
    '100%': {
      transform: 'rotate(1turn)',
    },
  },
});

export interface SpinnerProps {
  size?: SpinnerSizeProps;
}

export const Spinner: FC<SpinnerProps> = ({ size = 's' }) => {
  return (
    <>
      {size === 's' && <LoaderIconStyled sx={{ ...spinnerStyleState.size[size] }} />}

      {size === 'xl' && (
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            background: BG_MAIN,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoaderIconStyled sx={{ ...spinnerStyleState.size[size] }} />
        </Box>
      )}
    </>
  );
};
