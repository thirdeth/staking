import { FC } from 'react';
import { BoxProps, Grid, Skeleton } from '@mui/material';
import { BORDER_RADIUS_CARD_MEDIUM } from 'theme/variables';

import { BoxRowStyled, RowCardProps } from '../../RowCard';
import { rowCardStyleState } from '../../styleState';

export type RowCardSkeletonProps = Pick<RowCardProps, 'variant' | 'rowColor'> & BoxProps;

export const RowCardSkeleton: FC<RowCardSkeletonProps> = ({ variant = 'project', rowColor = 'gray', ...boxProps }) => {
  return (
    <BoxRowStyled
      p={{ xs: 2, sm: 2, md: rowCardStyleState.size[variant] }}
      sx={{
        backgroundColor: rowCardStyleState.color[rowColor],
        ...boxProps,
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        {new Array(4).fill('').map((_, index) => (
          // not important if will rerender
          // eslint-disable-next-line react/no-array-index-key
          <Grid key={index} item>
            <Skeleton
              animation="wave"
              sx={{ width: '220px', height: '50px', borderRadius: BORDER_RADIUS_CARD_MEDIUM }}
            />
          </Grid>
        ))}
      </Grid>
    </BoxRowStyled>
  );
};
