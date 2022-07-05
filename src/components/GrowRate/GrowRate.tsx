import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ArrowDown } from 'components/Icon/components';
import { COLOR_TEXT_GREEN, COLOR_TEXT_RED } from 'theme/variables';

export interface GrowRateProps {
  growAmount: number;
}

export const GrowRate: FC<GrowRateProps> = ({ growAmount }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 'fit-content',
      }}
    >
      {growAmount > 0 && (
        <ArrowDown
          sx={{
            position: 'absolute',
            top: '-5px',
            right: '-3px',
            transform: 'rotate(180deg)',
          }}
          fill={COLOR_TEXT_GREEN}
        />
      )}
      {growAmount < 0 && (
        <ArrowDown
          sx={{
            position: 'absolute',
            bottom: '-5px',
            right: '-3px',
          }}
          fill={COLOR_TEXT_RED}
        />
      )}
      <Typography variant="h4">{growAmount}</Typography>
    </Box>
  );
};
