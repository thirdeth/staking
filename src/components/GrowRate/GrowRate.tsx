import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ArrowDown } from 'components/Icon/components';
import { COLOR_TEXT_GREEN, COLOR_TEXT_RED } from 'theme/variables';

export interface GrowRateProps {
  isGrow?: boolean;
}

export const GrowRate: FC<GrowRateProps> = ({ isGrow = false }) => {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {isGrow ? (
        <ArrowDown
          sx={{
            position: 'absolute',
            top: '-5px',
            left: '-3px',
            transform: 'rotate(180deg)',
          }}
          fill={COLOR_TEXT_GREEN}
        />
      ) : (
        <ArrowDown
          sx={{
            position: 'absolute',
            bottom: '-5px',
            left: '-3px',
          }}
          fill={COLOR_TEXT_RED}
        />
      )}
      <Typography variant="h4">1</Typography>
    </Box>
  );
};
