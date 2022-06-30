import { FC } from 'react';
import { BoxProps, Grid, Skeleton } from '@mui/material';

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
      <Grid container justifyContent="space-between" alignItems="center" columnSpacing={2}>
        {new Array(4).fill('').map((_, index) => (
          // not important if will rerender
          // eslint-disable-next-line react/no-array-index-key
          <Grid key={index} item xs={6} md={3}>
            <Skeleton
              animation="wave"
              sx={{
                ml: { xs: 0, sm: 0, md: 1 },
                width: '160px',
                height: '50px',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </BoxRowStyled>
  );
};
