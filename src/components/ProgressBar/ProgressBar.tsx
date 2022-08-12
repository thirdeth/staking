import { FC, useRef } from 'react';
import { BoxProps, Grid } from '@mui/material';
import { useGetProgressItems } from 'hooks';
import { BG_BLUE, BG_MAIN, COLOR_TEXT_GRAY_EXTRALIGHT } from 'theme/variables';

import { PointValues, ProgressVariantProps } from './ProgressBar.types';

export interface ProgressBarProps {
  base: number;
  progress: number;
  variant?: ProgressVariantProps;
}

export const ProgressBar: FC<ProgressBarProps & BoxProps> = ({ progress, base, variant = 'circle', ...boxProps }) => {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [progressItems] = useGetProgressItems(progressRef, (100 / base) * progress);

  return (
    <Grid
      {...boxProps}
      container
      justifyContent="space-between"
      alignItems="center"
      flexWrap="nowrap"
      columnSpacing={0.2}
      px={2}
      ref={progressRef}
      sx={{
        height: '22px',
        background: COLOR_TEXT_GRAY_EXTRALIGHT,
        borderRadius: variant === 'parallelogram' ? '4px' : '20px',
        width: '100% !important',
      }}
    >
      {progressItems.map(({ value, color }) => (
        <Grid
          key={value}
          item
          sx={{
            background: color === PointValues.blue ? BG_BLUE : BG_MAIN,
            width: '7px !important',
            height: '8px',
            borderRadius: variant === 'circle' ? '20px' : 'none',
            transform: 'skew(25deg)',
          }}
        />
      ))}
    </Grid>
  );
};
