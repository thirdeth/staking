import { FC } from 'react';
import { Box, BoxProps, Grid } from '@mui/material';
import { BG_BLUE_LIGHT, BORDER_RADIUS_DEFAULT, TRANSITION_DEFAULT_TIME } from 'theme/variables';
import { ColorProps, ProjectCardDataProps, RankCardDataProps, VariantProps } from 'types';

import { Project, Rank, rowCardStyleState } from './index';

export interface RowCardProps {
  variant?: VariantProps;
  rowColor?: ColorProps;
  cardData: ProjectCardDataProps | RankCardDataProps;
}

export const RowCard: FC<RowCardProps & BoxProps> = ({
  variant = 'project',
  rowColor = 'gray',
  cardData,
  ...boxProps
}) => {
  return (
    <Box
      p={3.25}
      sx={{
        minHeight: '130px',
        borderRadius: BORDER_RADIUS_DEFAULT,
        backgroundColor: rowCardStyleState.color[rowColor],
        transition: TRANSITION_DEFAULT_TIME,
        ...boxProps,

        '&:hover': {
          backgroundColor: BG_BLUE_LIGHT,
        },
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        {variant === 'project' && cardData && <Project cardData={cardData} />}
        {variant === 'rank' && cardData && <Rank cardData={cardData} />}
      </Grid>
    </Box>
  );
};
